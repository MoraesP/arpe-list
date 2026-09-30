import { Ano } from '../models/ano.model';
import { Carrinho } from '../models/carrinho.model';
import { Colecao } from '../models/colecao.model';
import { Lote } from '../models/lote.model';

/**
 * Dados de exemplo para desenvolver e revisar o front antes de conectar
 * ao Firestore (ver docs/data-access.md). O formato já espelha o modelo
 * documentado em docs/data-model.md para facilitar a troca depois.
 */

export const MOCK_ANOS: Ano[] = [
  { id: '2026', numero: 2026 },
  { id: '2025', numero: 2025 },
  { id: '2024', numero: 2024 },
];

export const MOCK_LOTES: Lote[] = [
  { id: 'F', anoId: '2026', letra: 'F' },
  { id: 'E', anoId: '2026', letra: 'E' },
  { id: 'D', anoId: '2026', letra: 'D' },
  { id: 'B', anoId: '2025', letra: 'B' },
  { id: 'A', anoId: '2025', letra: 'A' },
];

export const MOCK_COLECOES: Colecao[] = [
  { id: 'factory-fresh', nome: 'HW Factory Fresh' },
  { id: 'rod-squad', nome: 'Rod Squad' },
  { id: 'muscle-mania', nome: 'Muscle Mania' },
];

export const MOCK_CARRINHOS: Carrinho[] = [
  { id: 'c1', anoId: '2026', loteId: 'F', colecaoId: 'factory-fresh', nome: 'Bounty Hunter', numero: '1/10', numeroNoLote: 1, raridade: 'normal' },
  { id: 'c2', anoId: '2026', loteId: 'F', colecaoId: 'rod-squad', nome: 'Rodger Dodger', numero: '2/5', numeroNoLote: 2, raridade: 'normal' },
  { id: 'c3', anoId: '2026', loteId: 'F', colecaoId: 'factory-fresh', nome: 'Turbo Volt', numero: '3/10', numeroNoLote: 3, raridade: 't-hunt' },
  { id: 'c4', anoId: '2026', loteId: 'F', colecaoId: 'muscle-mania', nome: 'Sand Blaster', numero: '4/8', numeroNoLote: 4, raridade: 'normal' },
  { id: 'c5', anoId: '2026', loteId: 'F', colecaoId: 'rod-squad', nome: 'Night Shifter', numero: '5/5', numeroNoLote: 5, raridade: 'normal' },
  {
    id: 'c6',
    anoId: '2026',
    loteId: 'F',
    colecaoId: 'factory-fresh',
    nome: 'Aero Pod',
    numero: '4/10',
    numeroNoLote: 6,
    raridade: 'super-t-hunt',
    observacao: 'Roda com acabamento perolizado, uma das saídas mais disputadas do lote.',
  },
  { id: 'c7', anoId: '2026', loteId: 'E', colecaoId: 'muscle-mania', nome: 'Sand Stinger', numero: '2/8', numeroNoLote: 1, raridade: 'normal' },
  { id: 'c8', anoId: '2026', loteId: 'E', colecaoId: 'rod-squad', nome: 'Circle Tracker', numero: '3/5', numeroNoLote: 2, raridade: 't-hunt' },
  { id: 'c9', anoId: '2026', loteId: 'E', colecaoId: 'factory-fresh', nome: 'Rapid Transit', numero: '7/10', numeroNoLote: 3, raridade: 'normal' },
  { id: 'c10', anoId: '2025', loteId: 'B', colecaoId: 'rod-squad', nome: '32 Ford', numero: '1/5', numeroNoLote: 1, raridade: 'normal' },
  { id: 'c11', anoId: '2025', loteId: 'B', colecaoId: 'muscle-mania', nome: 'Camaro Z28', numero: '2/8', numeroNoLote: 2, raridade: 'normal' },
  { id: 'c12', anoId: '2025', loteId: 'A', colecaoId: 'factory-fresh', nome: 'Custom Corvette', numero: '5/10', numeroNoLote: 1, raridade: 'normal' },
  {
    id: 'c13',
    anoId: '2025',
    loteId: 'A',
    colecaoId: 'muscle-mania',
    nome: 'Chevy Silverado',
    numero: '6/8',
    numeroNoLote: 2,
    raridade: 'super-t-hunt',
    observacao: 'Variação com rodas reais em metal escovado.',
  },
];
