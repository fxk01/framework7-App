/**
 * 前端静态数据处理
 */

import Polyglot from 'node-polyglot';
import zhCN from '../i18n/zh-CN.json';
import en from '../i18n/en.json';

const langs = {
    "zh-CN": zhCN,
    "en": en
};

export function initI18n(lng) {
    let polyglot = new Polyglot({ phrases: langs[lng], locale: lng });
    return polyglot;
}
