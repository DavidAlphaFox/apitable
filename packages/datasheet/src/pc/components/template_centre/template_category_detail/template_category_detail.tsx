import {
  ConfigConstant, integrateCdnHost, IReduxState, ITemplate, ITemplateCategory, Navigation, Settings, StoreActions, Strings, t,
} from '@apitable/core';
import { Typography } from '@apitable/components';
import { Col, Row } from 'antd';
import { TemplateListContext } from 'context/template_list';
import parser from 'html-react-parser';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { isWecomFunc } from 'pc/components/home/social_platform';
import { navigationToUrl } from 'pc/components/route_manager/navigation_to_url';
import { Router } from 'pc/components/route_manager/router';
// import { Modal } from 'pc/components/common';
import { useRequest } from 'pc/hooks';
import { useAppDispatch } from 'pc/hooks/use_app_dispatch';
import { useTemplateRequest } from 'pc/hooks/use_template_request';
import { getEnvVariables, isMobileApp } from 'pc/utils/env';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import templateEmptyPng from 'static/icon/template/template_img_empty.png';
import { imgUrl } from '../template_choice';
import { TemplateItem } from '../template_item';
import styles from './style.module.less';

const defaultBanner = integrateCdnHost(Settings.workbench_folder_default_cover_list.value.split(',')[0]);

export interface ITemplateCategoryDetailProps {
  isOfficial: boolean;
  templateCategory: ITemplateCategory[];
  setUsingTemplate: React.Dispatch<React.SetStateAction<string>>;
}

export const TemplateCategoryDetail: FC<ITemplateCategoryDetailProps> = props => {
  const { setUsingTemplate, templateCategory } = props;
  const { templateListData } = useContext(TemplateListContext);
  const [templateList, setTemplateList] = useState<ITemplate[] | {
    albums: {
      albumId: string;
      name: string;
      cover: string;
      description: string;
    }[];
    templates: ITemplate[];
  } | null>(() => {
    return templateListData || null;
  });
  const [isOfficial, setIsOfficial] = useState(true);
  const dispatch = useAppDispatch();
  const user = useSelector((state: IReduxState) => state.user.info);
  const spaceId = useSelector((state: IReduxState) => state.space.activeId);
  const categoryId = useSelector((state: IReduxState) => state.pageParams.categoryId);
  const { getTemplateCategoriesReq, getTemplateListReq, deleteTemplateReq } = useTemplateRequest();
  const { run: deleteTemplate } = useRequest(deleteTemplateReq, { manual: true });
  const { run: getTemplateList, data: templateData, loading } =
    useRequest<ITemplate[]>(getTemplateListReq, { manual: true });
  const env = getEnvVariables();
  const { run: getTemplateCategories, data: templateCategories, loading: _loading } =
    useRequest<ITemplate[]>(getTemplateCategoriesReq, { manual: true });

  useEffect(() => {
    // Login status is required to access the space station template
    if (categoryId === 'tpcprivate' && user) {
      setIsOfficial(false);
      getTemplateList(spaceId, '', true);
      !user.isMainAdmin && dispatch(StoreActions.spaceResource());
      return;
    }

    setIsOfficial(true);
    getTemplateCategories(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, user]);

  useEffect(() => {
    if (isOfficial) {
      setTemplateList(templateCategories || null);
    }
    if (templateData && !isOfficial) {
      setTemplateList(templateData);
    }
  }, [isOfficial, templateData, templateCategories]);

  const delTemplateConfirm = (templateId: string) => {
    import('pc/components/common/modal/modal/modal').then(({ Modal }) => {
      Modal.confirm({
        type: 'danger',
        title: t(Strings.delete_template_title),
        content: t(Strings.delete_template_content),
        onOk: () => {
          delTemplate(templateId);
        },
      });
    });
  };

  const delTemplate = async(templateId: string) => {
    if (!templateList) {
      return;
    }
    const result = await deleteTemplate(templateId);
    if (result) {
      setTemplateList((templateList as ITemplate[]).filter(template => template.templateId !== templateId));
    }
  };

  const openTemplateDetail = ({ templateId }) => {
    Router.push(Navigation.TEMPLATE, {
      params: {
        spaceId,
        categoryId: categoryId || ConfigConstant.TEMPLATE_CHOICE_CATEGORY_ID,
        templateId,
      },
    });
  };

  if (!templateList || loading) {
    return null;
  }

  const currentCategory = templateCategory.find(item => item.categoryCode === categoryId);

  const openTemplateAlbumDetail = ({ templateId }) => {
    Router.push(Navigation.TEMPLATE, {
      params: {
        spaceId,
        albumId: templateId,
        categoryId: 'album',
      },
    });
  };

  return (
    <div className={styles.templateDetailWrapper}>
      {
        (isEmpty(templateList)) ?
          (
            <div className={styles.listEmpty}>
              <Image src={templateEmptyPng} alt={t(Strings.template_no_template)} />
              <div className={styles.text}>{parser(t(Strings.how_create_template))}</div>
            </div>
          ) :
          (
            <Row className={styles.templateCategory}>
              <Col span={24}>
                <Row>
                  <Col className={styles.title}>
                    <div className={styles.categoryName}>
                      {!isOfficial ? t(Strings.all) : currentCategory && currentCategory.categoryName}
                    </div>
                    {env.TEMPLATE_FEEDBACK_FORM_URL && !isMobileApp() && !isWecomFunc() &&
                      <Typography className={styles.notFoundTip} variant='body2' align='center'>
                        <span
                          className={styles.text}
                          onClick={() => navigationToUrl(`${env.TEMPLATE_FEEDBACK_FORM_URL}`)}
                        >
                          {t(Strings.template_not_found)}
                        </span>
                      </Typography>
                    }
                  </Col>
                </Row>
                <>
                  {Array.isArray(templateList) ? (
                    <div className={styles.templateList}>
                      {templateList.map(template => (
                        <div className={styles.templateItemWrapper} key={template.templateId}>
                          <TemplateItem
                            type='card'
                            nodeType={template.nodeType}
                            templateId={template.templateId}
                            img={imgUrl(template.cover || defaultBanner, 160)}
                            name={template.templateName}
                            description={template.description}
                            tags={template.tags}
                            isOfficial={isOfficial}
                            creator={{ name: template.nickName, avatar: template.avatar, userId: template.uuid }}
                            deleteTemplate={delTemplateConfirm}
                            usingTemplate={setUsingTemplate}
                            onClick={openTemplateDetail}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {!isEmpty(templateList.albums) && (
                        <>
                          <h3>{t(Strings.album)}</h3>
                          <div className={styles.templateList}>
                            {templateList.albums.map(album => {
                              return (
                                <div className={styles.albumItemWrapper} key={album.albumId}>
                                  <TemplateItem
                                    bannerDesc={{
                                      title: album.name,
                                      desc: album.description,
                                    }}
                                    templateId={album.albumId}
                                    height={200}
                                    img={imgUrl(album.cover || defaultBanner, 200)}
                                    onClick={openTemplateAlbumDetail}
                                    isOfficial={isOfficial}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                      {!isEmpty(templateList.templates) && (
                        <>
                          <h3>{t(Strings.template)}</h3>
                          <div className={styles.templateList}>
                            {templateList.templates.map(template => (
                              <div className={styles.templateItemWrapper} key={template.templateId}>
                                <TemplateItem
                                  type='card'
                                  nodeType={template.nodeType}
                                  templateId={template.templateId}
                                  img={imgUrl(template.cover || defaultBanner, 160)}
                                  name={template.templateName}
                                  description={template.description}
                                  tags={template.tags}
                                  isOfficial={isOfficial}
                                  creator={{ name: template.nickName, avatar: template.avatar, userId: template.uuid }}
                                  deleteTemplate={delTemplateConfirm}
                                  usingTemplate={setUsingTemplate}
                                  onClick={openTemplateDetail}
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )
                  }
                </>
              </Col>
            </Row>
          )
      }
    </div>
  );
};
