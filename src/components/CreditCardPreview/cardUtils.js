import Payment from 'payment';
import { CARD_TYPES } from './cards';

function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value, secret) {

    const issuer = Payment.fns.cardType(value)
    let clearValue = clearNumber(value)
    const valuesLength = clearValue.split("").length;
    const maxLength = CARD_TYPES[issuer]?.maxLength || 16;
    let nextValue

    if (secret && valuesLength < maxLength) {
        for (let i = 0; i < maxLength - valuesLength; i++) {
            clearValue += '#'
        }
    }
    switch (issuer) {
        case 'amex':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 15)}`
            break
        case 'dinersclub':
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                10
            )} ${clearValue.slice(10, 14)}`
            break
        default:
            nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
                4,
                8
            )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
            break
    }

    return nextValue.trim()
}

export function formatCVC(value, prevValue, allValues = {}) {
    const clearValue = clearNumber(value)
    let maxLength = 4

    if (allValues.number) {
        const issuer = Payment.fns.cardType(allValues.number)
        maxLength = issuer === 'amex' ? 4 : 3
    }

    return clearValue.slice(0, maxLength)
}