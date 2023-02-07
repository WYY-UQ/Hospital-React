import request from '@/utils/request';

export async function queryCommonDicts(dictType) {
  return request(`/common/queryCommonDicts?dictType=${dictType}`);
}

export async function queryTags(tagType) {
  return request(`/common/queryTags?tagType=${tagType}`);
}

export async function queryRegions() {
  return request('/common/queryRegions');
}

export async function queryDosages(dosageSysCode) {
  return request(`/common/queryDosages?dosageSysCode=${dosageSysCode}`);
}

export async function queryUnits(unitType = 1) {
  return unitType
    ? request(`/common/queryUnits?unitType=${unitType}`)
    : request(`/common/queryUnits`);
}

export async function queryCompanies(params) {
  return request(`/common/queryCompanies`, {
    params,
  });
}

export async function queryApprovalNos(params) {
  return request(`/common/queryApprovalNos`, {
    params,
  });
}

export async function queryExecutiveStandards(params) {
  return request(`/common/queryExecutiveStandards`, {
    params,
  });
}

export async function queryCommonNameSelections(params) {
  return request(`/common/queryCommonNameSelections`, {
    params,
  });
}

export async function querySecMaterialDrugs(params) {
  return request(`/common/querySecMaterialDrugs`, {
    params,
  });
}

export async function queryCommodityCodes(params) {
  return request(`/common/queryCommodityCodes`, {
    params,
  });
}

export async function queryProductSelections(params) {
  return request(`/common/queryProductSelections`, {
    params,
  });
}

export async function queryCommonNameWithCompanies(params) {
  return request(`/common/queryCommonNameWithCompanies`, {
    params,
  });
}

export async function queryAdverseReactions(params) {
  return request(`/common/queryAdverseReactions`, {
    params,
  });
}

export async function queryAdverseReactionTplSections(params) {
  return request(`/common/queryAdverseReactionTplSections`, {
    params,
  });
}

export async function getIndicationTree(params) {
  return request(`/common/getIndicationTree`, {
    params,
  });
}

export async function queryIndicationTplSections(params) {
  return request(`/common/queryIndicationTplSections`, {
    params,
  });
}

export async function queryObjects(params) {
  return request(`/common/queryObjects`, {
    params,
  });
}

export async function getDrugCategoryTree(params) {
  return request(`/common/getDrugCategoryTree`, {
    params,
  });
}

export async function queryDirectionSections(params) {
  return request(`/common/queryDirectionSections`, {
    params,
  });
}

export async function queryLiteratureSections(params) {
  return request(`/common/queryLiteratureSections`, {
    params,
  });
}

export async function queryCategoryObjects(params) {
  return request(`/common/queryCategoryObjects`, {
    params,
  });
}

export async function queryCrowds(params) {
  return request('/common/queryCrowds', {
    params,
  });
}

export async function getAdverseReactionTree(params) {
  return request('/common/getAdverseReactionTree', {
    params,
  });
}

export async function getChineseMedicineTree(params) {
  return request('/common/getChineseMedicineTree', {
    params,
  });
}

export async function queryIndicationChildren(params) {
  return request('/common/queryIndicationChildren', {
    params,
  });
}

export async function queryCommonNameDrugGroups(params) {
  return request('/common/queryCommonNameDrugGroups', {
    params,
  });
}

export async function queryCommonNameWithSpecGroups(params) {
  return request('/common/queryCommonNameWithSpecGroups', {
    params,
  });
}
