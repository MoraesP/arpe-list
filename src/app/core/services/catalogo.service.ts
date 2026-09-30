import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ano } from '../models/ano.model';
import { Carrinho } from '../models/carrinho.model';
import { Colecao } from '../models/colecao.model';
import { Lote } from '../models/lote.model';
import { MOCK_ANOS, MOCK_CARRINHOS, MOCK_COLECOES, MOCK_LOTES } from '../mock/mock-data';

export interface AnoResumo {
  ano: Ano;
  totalLotes: number;
}

export interface LoteResumo {
  lote: Lote;
  totalCarrinhos: number;
}

/**
 * Leitura do catálogo (site público). Hoje devolve os dados de mock;
 * quando a persistência for conectada, cada método aqui vira uma query
 * ao Firestore como descrito em docs/data-access.md — a assinatura dos
 * métodos (e o formato do retorno) foi pensada para não mudar nessa troca.
 */
@Injectable({ providedIn: 'root' })
export class CatalogoService {
  listAnos(): Observable<Ano[]> {
    return of([...MOCK_ANOS].sort((a, b) => b.numero - a.numero));
  }

  listAnosResumo(): Observable<AnoResumo[]> {
    const anos = [...MOCK_ANOS].sort((a, b) => b.numero - a.numero);
    return of(
      anos.map((ano) => ({
        ano,
        totalLotes: MOCK_LOTES.filter((lote) => lote.anoId === ano.id).length,
      })),
    );
  }

  getAno(anoId: string): Observable<Ano | undefined> {
    return of(MOCK_ANOS.find((ano) => ano.id === anoId));
  }

  listLotes(anoId: string): Observable<Lote[]> {
    return of(
      MOCK_LOTES.filter((lote) => lote.anoId === anoId).sort((a, b) => b.letra.localeCompare(a.letra)),
    );
  }

  listLotesResumo(anoId: string): Observable<LoteResumo[]> {
    const lotes = MOCK_LOTES.filter((lote) => lote.anoId === anoId).sort((a, b) => b.letra.localeCompare(a.letra));
    return of(
      lotes.map((lote) => ({
        lote,
        totalCarrinhos: MOCK_CARRINHOS.filter((c) => c.loteId === lote.id && c.anoId === anoId).length,
      })),
    );
  }

  getLote(anoId: string, loteId: string): Observable<Lote | undefined> {
    return of(MOCK_LOTES.find((lote) => lote.anoId === anoId && lote.id === loteId));
  }

  listCarrinhos(anoId: string, loteId: string): Observable<Carrinho[]> {
    return of(
      MOCK_CARRINHOS.filter((c) => c.anoId === anoId && c.loteId === loteId).sort(
        (a, b) => a.numeroNoLote - b.numeroNoLote,
      ),
    );
  }

  getCarrinho(anoId: string, loteId: string, carrinhoId: string): Observable<Carrinho | undefined> {
    return of(MOCK_CARRINHOS.find((c) => c.anoId === anoId && c.loteId === loteId && c.id === carrinhoId));
  }

  getColecao(colecaoId: string): Observable<Colecao | undefined> {
    return of(MOCK_COLECOES.find((c) => c.id === colecaoId));
  }
}
