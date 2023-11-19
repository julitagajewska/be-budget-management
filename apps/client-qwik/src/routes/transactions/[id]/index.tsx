import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const TransactionPage = component$(() => {
  const id = useLocation().params.id
  return <div>Transakcja - ID: {id} </div>;
});

export default TransactionPage;