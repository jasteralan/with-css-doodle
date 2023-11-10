import React from 'react';
import 'css-doodle';
import { ClientOnly } from 'remix-utils/client-only';

function CssDoodle({ rule = '' }) {
  return <css-doodle>{ rule }</css-doodle>
}

export function DoodleUse({ usevar }) {
  return <ClientOnly>{() => <css-doodle click-to-update use={`var(${usevar})`} />}</ClientOnly>
}

export default function Doodle({rule}) {
  return <ClientOnly>{() => <CssDoodle rule={rule} />}</ClientOnly>
}