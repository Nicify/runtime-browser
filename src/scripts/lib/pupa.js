export function pupa(template, data) {
    if (typeof template !== 'string') {
        throw new TypeError(`Expected a \`string\` in the first argument, got \`${typeof template}\``)
    }

    if (typeof data !== 'object') {
        throw new TypeError(`Expected an \`object\` or \`Array\` in the second argument, got \`${typeof data}\``)
    }

    const escapeBraceRegex = /<%=(.*?)%>/g

    if (escapeBraceRegex.test(template)) {
        template = template.replace(escapeBraceRegex, (_, key) => {
            let result = data

            for (const property of key.split('.')) {
                result = result ? result[property] : ''
            }
            return $text.HTMLEscape(result.toString()) || ''
        })
    }

    const braceRegex = /<%-(.*?)%>/g

    return template.replace(braceRegex, (_, key) => {
        let result = data
        for (const property of key.split('.')) {
            result = result ? result[property] : ''
        }
        return result || ''
    })
}