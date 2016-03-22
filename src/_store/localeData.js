import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import th from 'react-intl/locale-data/th';
import ar from 'react-intl/locale-data/ar';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
import ru from 'react-intl/locale-data/ru';
import pl from 'react-intl/locale-data/pl';
import vi from 'react-intl/locale-data/vi';
import it from 'react-intl/locale-data/it';
import zh from 'react-intl/locale-data/zh';
import id from 'react-intl/locale-data/id';
import de from 'react-intl/locale-data/de';
import ja from 'react-intl/locale-data/ja';

const data = {
	en, fr,
	th, ar,
	es, pt,
	ru, pl,
	vi, it,
	zh, id,
    de, ja,
};

export default ln => data[ln];
