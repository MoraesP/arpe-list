export type Raridade = 'normal' | 't-hunt' | 'super-t-hunt';

export interface Carrinho {
  id: string;
  anoId: string;
  loteId: string;
  colecaoId: string;
  nome: string;
  numero: string;
  numeroNoLote: number;
  raridade: Raridade;
  /** Ausente até o upload real ser conectado (ver docs/data-access.md). */
  imagemPrincipalUrl?: string;
  /** Só existe quando raridade === 'super-t-hunt'. */
  imagemVariacaoSuperUrl?: string;
  observacao?: string;
}
