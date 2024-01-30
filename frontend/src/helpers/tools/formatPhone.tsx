
// TODO rewrite regex to match all phone number formats

/**
 * @param phone - a string containing a phone number
 * @returns a string containing the phone number in the format of xxx-xxx-xxxx
 */
function formatPhone(phone: string) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
}

export default formatPhone;