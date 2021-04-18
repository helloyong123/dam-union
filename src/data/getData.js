import fetch from '../config/fetch'


export const apply = (params) => fetch('/borrower/apply', {params}, 'POST');

export const applyTwo = (params) => fetch('/borrower/applyTwo', {params}, 'POST');

export const register = (mobile, code, mark, back) => fetch('/borrower/register', {mobile, code, mark, back}, 'POST');

export const sendCode = (params) => fetch('/borrower/sendCode', {params}, 'POST');

export const isSuccess = (params) => fetch('/borrower/isSuccess', {params}, 'POST');

export const successProduct = (params) => fetch('/borrower/successProduct', {params}, 'POST');
