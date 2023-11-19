import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';

const GoalPage = component$(() => {
  const id = useLocation().params.id
  return <div>Cel - ID: {id} </div>;
});

export default GoalPage;