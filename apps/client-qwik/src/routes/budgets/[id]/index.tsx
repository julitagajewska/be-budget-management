import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const BudgetPage = component$(() => {
  const id = useLocation().params.id
  return <div>Budżet - ID: {id} </div>;
});

export default BudgetPage;