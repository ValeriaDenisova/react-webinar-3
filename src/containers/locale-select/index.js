import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Select from '../../components/select';
import SelectSort from '../../components/select-sort';

/**
 * Контейнер для смены языка
 */
function LocaleSelect() {
  const { lang, setLang } = useTranslate();

  const options = {
    lang: useMemo(
      () => [
        { value: 'ru', title: 'Русский' },
        { value: 'en', title: 'English' },
      ],
      [],
    ),
  };

  return <SelectSort onChange={setLang} value={lang} options={options.lang} />;
}

export default memo(LocaleSelect);
