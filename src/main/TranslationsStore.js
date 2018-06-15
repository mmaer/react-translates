import { get, without } from 'lodash';

class TranslationsStore {
    constructor(translations) {
        this.translations = translations;
        this.subscriptions = [];
    }

    setTranslations(translations) {
        this.translations = translations;
        this.subscriptions.forEach(callback => callback());
    }

    getTranslationValue(key, count) {
        const { translations } = this;
        if (count !== null) {
            if (get(translations, `${key}_${count}`)) {
                return get(translations, `${key}_${count}`);
            } else if (count !== 1 && get(translations, `${key}_plural`)) {
                return get(translations, `${key}_plural`);
            }
        }
        return get(translations, key);
    }

    subscribe(callback) {
        this.subscriptions.push(callback);
    }

    unsubscribe(callback) {
        this.subscriptions = without(this.subscriptions, callback);
    }
}

export default TranslationsStore;
