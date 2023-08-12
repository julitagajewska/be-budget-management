import { useTranslation } from 'react-i18next';

const HomeView = () => {
  const { t } = useTranslation();
  return <div className="h-[200vh] w-full bg-slate-200 rounded-xl">{t('page.title.home')}</div>;
};

export default HomeView;
