//@ts-nocheck
function templateCode({
  headers,
queryParams,
  pathParams,
  code,
} ) {
  const template = `const process={}; const global={}; const userCode = ({headers,queryParams,pathParams,}) => { const console = {}; ${(code && code.toString())}};const userCodeResult = userCode({headers:${JSON.stringify(headers)},queryParams:${JSON.stringify(queryParams)},pathParams:${JSON.stringify(pathParams)},}); console.log(JSON.stringify(userCodeResult));`;
  return template;
}

export default templateCode;
