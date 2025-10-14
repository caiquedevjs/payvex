// Em app/_layout.js

import { Slot } from 'expo-router';
import React from 'react';
// 1. Importe o ToastManager aqui

export default function RootLayout() {
  return (
    // <> é um Fragmento que permite agrupar elementos sem criar um View extra
    <>
      {/* O <Slot /> renderiza a tela atual (index.js, home.js, etc.) */}
      <Slot />
      
      {/* 2. Coloque o ToastManager aqui para que ele funcione em todo o app */}
     
    </>
  );
}