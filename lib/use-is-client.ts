'use client'

import { useSyncExternalStore } from 'react'

/** Nada externo muda; a assinatura existe só para satisfazer a API. */
const subscribe = () => () => {}

/**
 * `false` durante a renderização no servidor e na primeira passada de
 * hidratação, `true` depois. Serve para adiar leituras que só existem no
 * cliente — tema salvo no localStorage, por exemplo — sem cair no padrão
 * `useState` + `useEffect`, que dispara renderização em cascata.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
