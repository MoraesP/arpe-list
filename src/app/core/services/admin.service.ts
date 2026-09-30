import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Colecao } from '../models/colecao.model';
import { Raridade } from '../models/carrinho.model';
import { MOCK_COLECOES } from '../mock/mock-data';

export interface NovoCarrinhoPayload {
  anoId: string;
  loteId: string;
  nome: string;
  numero: string;
  colecaoId?: string;
  colecaoNome?: string;
  raridade: Raridade;
  observacao?: string;
  fotoPrincipal?: File;
  fotoVariacaoSuper?: File;
}

/**
 * Escrita do painel administrativo. Ainda não persiste nada — cada método
 * é o ponto de extensão para as chamadas reais ao Firestore/Storage
 * descritas em docs/data-access.md (inclusive as Security Rules que
 * validam raridade x foto da variação Super).
 */
@Injectable({ providedIn: 'root' })
export class AdminService {
  criarAno(numero: number): void {
    // TODO: setDoc(doc(db, 'anos', String(numero)), { numero })
    console.info('[AdminService] criarAno', numero);
  }

  criarLote(anoId: string, letra: string): void {
    // TODO: setDoc(doc(db, 'anos', anoId, 'lotes', letra), { letra })
    console.info('[AdminService] criarLote', { anoId, letra });
  }

  buscarColecoes(termo: string): Observable<Colecao[]> {
    const termoNormalizado = termo.trim().toLowerCase();
    if (!termoNormalizado) {
      return of(MOCK_COLECOES);
    }
    return of(MOCK_COLECOES.filter((colecao) => colecao.nome.toLowerCase().includes(termoNormalizado)));
  }

  salvarCarrinho(payload: NovoCarrinhoPayload): void {
    // TODO: addDoc(collection(db, 'anos', anoId, 'lotes', loteId, 'carrinhos'), {...})
    //       + upload das fotos no Storage (ver docs/data-access.md)
    console.info('[AdminService] salvarCarrinho', payload);
  }
}
