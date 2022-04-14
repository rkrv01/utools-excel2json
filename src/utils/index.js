/**
 * @name: TODO: 有报错 文件流转BinaryString
 * @param {type}
 * @return:
 */
export function fixdata(data) {
    const o = "";
    const l = 0;
    const w = 10240;
    for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
        );
    }
    o += String.fromCharCode.apply(
        null,
        new Uint8Array(data.slice(l * w))
    );
    return o;
}