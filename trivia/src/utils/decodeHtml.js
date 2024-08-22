export function decodeHtml(string) {
    const $decoder = document.createElement("textarea");
    $decoder.innerHTML = string;
    return $decoder.value;
}
