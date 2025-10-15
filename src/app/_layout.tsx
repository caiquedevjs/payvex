// Em seu arquivo de layout principal (ex: _layout.tsx ou App.tsx)

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Slot } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      {/* ✅ CORREÇÃO: O IconRegistry vem ANTES/FORA do ApplicationProvider */}
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={eva.light}>
        {/* O <Slot /> renderiza a tela atual */}
        <Slot />
      </ApplicationProvider>
    </>
  );
}