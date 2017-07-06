function validateRequest(obj) {
    let methodType = obj['method'];
    if (methodType !== 'GET' && methodType !== 'POST' && methodType !== 'DELETE' && methodType !== 'CONNECT' || methodType === undefined) {
        throw new Error('Invalid request header: Invalid Method');
    }

    let uri = obj['uri'];
    let rgx = /^[A-Za-z0-9\.]+$/;
    if (uri === '' || (uri !== '*' && !rgx.test(uri)) || uri === undefined) {
        throw new Error('Invalid request header: Invalid URI');
    }

    let version = obj['version'];
    if ((version !== 'HTTP/0.9' && version !== 'HTTP/1.0' && version !== 'HTTP/1.1' && version !== 'HTTP/2.0') || version === undefined) {
        throw new Error('Invalid request header: Invalid Version');
    }

    let message = obj['message'];
    let regex = /^[^<>\\&'"]*$/;
    if (!regex.test(message) || message === undefined) {
        throw new Error('Invalid request header: Invalid Message');
    }

    return obj;
}

validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});

/*
 let valid = result({
 method: 'GET',
 uri: 'svn.public.catalog',
 version: 'HTTP/1.1',
 message: ''
 });

 let obj = {
 method: 'GET',
 uri: 'kkk jjjj',
 version: 'HTTP/0.8',
 message: ''
 };

 expect(() => result(obj)).to.throw(Error).which.has.property('message', 'Invalid request header: Invalid URI');
 obj.uri = '';
 expect(() => result(obj)).to.throw(Error).which.has.property('message', 'Invalid request header: Invalid URI');
 obj.uri = 'gib ';
 expect(() => result(obj)).to.throw(Error).which.has.property('message', 'Invalid request header: Invalid URI');
 */
validateRequest({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});