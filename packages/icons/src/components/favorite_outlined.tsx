/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable max-len */
import React from 'react';
import { makeIcon, IIconProps } from '../utils/icon';

export const FavoriteOutlined: React.FC<IIconProps> = makeIcon({
  Path: ({ colors }) => <>
    <path d="M8 1C8.38912 1 8.74291 1.22572 8.90688 1.57861L10.5228 5.05625L14.1469 5.59444C14.5191 5.64971 14.8288 5.90924 14.9482 6.26604C15.0677 6.62285 14.9768 7.01652 14.713 7.28479L12.0523 9.99009L12.6945 13.8353C12.7579 14.2144 12.5983 14.5962 12.284 14.8176C11.9698 15.0389 11.5565 15.0605 11.2208 14.8732L8 13.0755L4.77917 14.8732C4.44354 15.0605 4.03023 15.0389 3.71598 14.8176C3.40172 14.5962 3.24214 14.2144 3.30546 13.8353L3.94771 9.99009L1.28704 7.28479C1.02319 7.01652 0.932274 6.62285 1.05176 6.26604C1.17125 5.90924 1.48091 5.64971 1.85311 5.59444L5.47719 5.05625L7.09312 1.57861C7.2571 1.22572 7.61088 1 8 1ZM8 4.37308L7.0639 6.38765C6.92217 6.69266 6.63661 6.906 6.30392 6.95541L4.09143 7.28397L5.73097 8.95101C5.95545 9.17926 6.05708 9.50119 6.00434 9.81696L5.62084 12.113L7.51263 11.0571C7.81555 10.888 8.18446 10.888 8.48738 11.0571L10.3792 12.113L9.99567 9.81696C9.94292 9.50119 10.0446 9.17926 10.269 8.95101L11.9086 7.28397L9.69609 6.95541C9.3634 6.906 9.07783 6.69266 8.9361 6.38765L8 4.37308Z" fill={ colors[0] } fillRule="evenodd" clipRule="evenodd"/>

  </>,
  name: 'favorite_outlined',
  defaultColors: ['#C4C4C4'],
  colorful: false,
  allPathData: ['M8 1C8.38912 1 8.74291 1.22572 8.90688 1.57861L10.5228 5.05625L14.1469 5.59444C14.5191 5.64971 14.8288 5.90924 14.9482 6.26604C15.0677 6.62285 14.9768 7.01652 14.713 7.28479L12.0523 9.99009L12.6945 13.8353C12.7579 14.2144 12.5983 14.5962 12.284 14.8176C11.9698 15.0389 11.5565 15.0605 11.2208 14.8732L8 13.0755L4.77917 14.8732C4.44354 15.0605 4.03023 15.0389 3.71598 14.8176C3.40172 14.5962 3.24214 14.2144 3.30546 13.8353L3.94771 9.99009L1.28704 7.28479C1.02319 7.01652 0.932274 6.62285 1.05176 6.26604C1.17125 5.90924 1.48091 5.64971 1.85311 5.59444L5.47719 5.05625L7.09312 1.57861C7.2571 1.22572 7.61088 1 8 1ZM8 4.37308L7.0639 6.38765C6.92217 6.69266 6.63661 6.906 6.30392 6.95541L4.09143 7.28397L5.73097 8.95101C5.95545 9.17926 6.05708 9.50119 6.00434 9.81696L5.62084 12.113L7.51263 11.0571C7.81555 10.888 8.18446 10.888 8.48738 11.0571L10.3792 12.113L9.99567 9.81696C9.94292 9.50119 10.0446 9.17926 10.269 8.95101L11.9086 7.28397L9.69609 6.95541C9.3634 6.906 9.07783 6.69266 8.9361 6.38765L8 4.37308Z'],
  width: '16',
  height: '16',
  viewBox: '0 0 16 16',
});
