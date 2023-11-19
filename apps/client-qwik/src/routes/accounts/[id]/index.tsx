import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const AccountPage = component$(() => {
  const id = useLocation().params.id
  return <div>Konto - ID: {id} </div>;
});

export default AccountPage;