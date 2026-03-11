import React, { useEffect, useMemo, useState } from 'react';
import { SmartImage } from './SmartImage';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG'] as const;
type Size = (typeof SIZES)[number];
type ModelType = 'masculino' | 'feminino';
type MemberType = 'socio' | 'nao-socio';
type QuantityType = '1' | '2';

type JerseyKey =
  | 'jogo-branca'
  | 'jogo-laranja'
  | 'jogo-roxa'
  | 'jogo-vermelha'
  | 'torcedor-branca'
  | 'torcedor-laranja'
  | 'torcedor-roxa'
  | 'torcedor-vermelha';

type SizeInfo = {
  tabelaBase: string;
  peitoral: number;
  comprimento: number;
  referencia: string;
};

type ItemState = {
  jersey: JerseyKey | null;
  model: ModelType;
  size: Size | null;
  numeroOpcao: 'com' | 'sem' | null;
  numeroCamisa: string;
  nomePersonalizado: string;
};

const SIZE_INFO: Record<ModelType, Record<Size, SizeInfo>> = {
  masculino: {
    PP: { tabelaBase: '/manto/modelagem-masculina', peitoral: 48, comprimento: 70, referencia: '60 a 63 kg' },
    P: { tabelaBase: '/manto/modelagem-masculina', peitoral: 50, comprimento: 72, referencia: '66 a 75 kg' },
    M: { tabelaBase: '/manto/modelagem-masculina', peitoral: 52, comprimento: 74, referencia: '76 a 84 kg' },
    G: { tabelaBase: '/manto/modelagem-masculina', peitoral: 54, comprimento: 76, referencia: '85 a 94 kg' },
    GG: { tabelaBase: '/manto/modelagem-masculina', peitoral: 56, comprimento: 78, referencia: '95 a 104 kg' },
    XG: { tabelaBase: '/manto/modelagem-masculina', peitoral: 58, comprimento: 80, referencia: '105 a 114 kg' },
  },
  feminino: {
    PP: { tabelaBase: '/manto/modelagem-feminina', peitoral: 42, comprimento: 58, referencia: 'Feminino PP' },
    P: { tabelaBase: '/manto/modelagem-feminina', peitoral: 44, comprimento: 60, referencia: 'Feminino P' },
    M: { tabelaBase: '/manto/modelagem-feminina', peitoral: 46, comprimento: 62, referencia: 'Feminino M' },
    G: { tabelaBase: '/manto/modelagem-feminina', peitoral: 48, comprimento: 64, referencia: 'Feminino G' },
    GG: { tabelaBase: '/manto/modelagem-feminina', peitoral: 50, comprimento: 66, referencia: 'Feminino GG' },
    XG: { tabelaBase: '/manto/modelagem-feminina', peitoral: 52, comprimento: 68, referencia: 'Feminino XG' },
  },
};

const JERSEYS: Record<
  JerseyKey,
  {
    title: string;
    subtitle: string;
    basePath: string;
    availableFor: MemberType[];
  }
> = {
  'jogo-branca': {
    title: 'Branca',
    subtitle: 'Versão jogo',
    basePath: '/manto/jogo-branca',
    availableFor: ['socio', 'nao-socio'],
  },
  'jogo-laranja': {
    title: 'Laranja',
    subtitle: 'Versão jogo',
    basePath: '/manto/jogo-laranja',
    availableFor: ['socio', 'nao-socio'],
  },
  'jogo-roxa': {
    title: 'Roxa',
    subtitle: 'Versão jogo',
    basePath: '/manto/jogo-roxa',
    availableFor: ['socio', 'nao-socio'],
  },
  'jogo-vermelha': {
    title: 'Vermelha',
    subtitle: 'Versão jogo',
    basePath: '/manto/jogo-vermelha',
    availableFor: ['socio', 'nao-socio'],
  },
  'torcedor-branca': {
    title: 'Branca',
    subtitle: 'Versão sócio',
    basePath: '/manto/torcedor-branca',
    availableFor: ['socio'],
  },
  'torcedor-laranja': {
    title: 'Laranja',
    subtitle: 'Versão sócio',
    basePath: '/manto/torcedor-laranja',
    availableFor: ['socio'],
  },
  'torcedor-roxa': {
    title: 'Roxa',
    subtitle: 'Versão sócio',
    basePath: '/manto/torcedor-roxa',
    availableFor: ['socio'],
  },
  'torcedor-vermelha': {
    title: 'Vermelha',
    subtitle: 'Versão sócio',
    basePath: '/manto/torcedor-vermelha',
    availableFor: ['socio'],
  },
};

const PRICE_TABLE: Record<MemberType, Record<QuantityType, string>> = {
  socio: {
    '1': 'R$ 135,00',
    '2': 'R$ 250,00',
  },
  'nao-socio': {
    '1': 'R$ 160,00',
    '2': 'R$ 320,00',
  },
};

const MEMBER_LABEL: Record<MemberType, string> = {
  socio: 'Sócio',
  'nao-socio': 'Não Sócio',
};

const MEMBER_DETAILS: Record<MemberType, string[]> = {
  socio: [
    'Personalizada',
    'Pode escolher a versão',
    'Opção com ou sem patrocinador',
  ],
  'nao-socio': [
    'Personalizada',
    'Disponível apenas para versão de jogo',
  ],
};

const emptyItem = (): ItemState => ({
  jersey: null,
  model: 'masculino',
  size: null,
  numeroOpcao: null,
  numeroCamisa: '',
  nomePersonalizado: '',
});

export const BuyModal: React.FC<BuyModalProps> = ({ isOpen, onClose }) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [memberType, setMemberType] = useState<MemberType | null>(null);
  const [quantity, setQuantity] = useState<QuantityType | null>(null);
  const [temPatrocinador, setTemPatrocinador] = useState<'sim' | 'nao' | null>(null);

  const [item1, setItem1] = useState<ItemState>(emptyItem());
  const [item2, setItem2] = useState<ItemState>(emptyItem());

  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setNome('');
        setTelefone('');
        setMemberType(null);
        setQuantity(null);
        setTemPatrocinador(null);
        setItem1(emptyItem());
        setItem2(emptyItem());
        setSubmitted(false);
        setSending(false);
        setErrors({});
      }, 250);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setItem1(emptyItem());
    setItem2(emptyItem());
    if (memberType === 'nao-socio') {
      setTemPatrocinador(null);
    }
  }, [memberType]);

  useEffect(() => {
    if (quantity === '1') {
      setItem2(emptyItem());
    }
  }, [quantity]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const availableJerseys = useMemo(() => {
    if (!memberType) return [];
    return Object.entries(JERSEYS).filter(([, jersey]) =>
      jersey.availableFor.includes(memberType)
    );
  }, [memberType]);

  const selectedPrice = useMemo(() => {
    if (!memberType || !quantity) return null;
    return PRICE_TABLE[memberType][quantity];
  }, [memberType, quantity]);

  const validateItem = (item: ItemState, prefix: string, nextErrors: Record<string, string>) => {
    if (!item.jersey) nextErrors[`${prefix}_camisa`] = 'Selecione a camisa.';
    if (!item.size) nextErrors[`${prefix}_tamanho`] = 'Selecione o tamanho.';
    if (!item.numeroOpcao) nextErrors[`${prefix}_numero`] = 'Selecione se quer número.';
    if (item.numeroOpcao === 'com' && !item.numeroCamisa.trim()) {
      nextErrors[`${prefix}_numero`] = 'Informe o número da camisa.';
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!nome.trim()) nextErrors.nome = 'Informe seu nome.';
    if (telefone.replace(/\D/g, '').length < 10) nextErrors.telefone = 'Informe um telefone válido.';
    if (!memberType) nextErrors.membro = 'Escolha se é sócio ou não.';
    if (!quantity) nextErrors.quantidade = 'Selecione a quantidade.';
    if (memberType === 'socio' && !temPatrocinador) nextErrors.patrocinador = 'Selecione patrocinador.';

    validateItem(item1, 'item1', nextErrors);
    if (quantity === '2') validateItem(item2, 'item2', nextErrors);

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleEmailSubmit = async () => {
    if (!validate() || !memberType || !quantity || !item1.jersey || !item1.size) return;
    if (quantity === '2' && (!item2.jersey || !item2.size)) return;

    setSending(true);

    try {
      const body: Record<string, string> = {
        nome,
        telefone,
        tipo_cliente: MEMBER_LABEL[memberType],
        quantidade_camisas: quantity,
        valor: PRICE_TABLE[memberType][quantity],
        patrocinador: memberType === 'socio' ? (temPatrocinador || '') : 'não se aplica',
        _subject: 'Novo pedido de camisa - Prosperidade FC',
        _template: 'table',
      };

      const item1Info = SIZE_INFO[item1.model][item1.size];
      body.camisa_1 = JERSEYS[item1.jersey].title;
      body.versao_1 = JERSEYS[item1.jersey].subtitle;
      body.modelagem_1 = item1.model;
      body.tamanho_1 = item1.size;
      body.numero_1 = item1.numeroOpcao === 'com' ? item1.numeroCamisa : 'sem número';
      body.personalizar_nome_1 = item1.nomePersonalizado.trim() || 'não informado';
      body.peitoral_1 = `${item1Info.peitoral} cm`;
      body.comprimento_1 = `${item1Info.comprimento} cm`;
      body.referencia_1 = item1Info.referencia;

      if (quantity === '2' && item2.jersey && item2.size) {
        const item2Info = SIZE_INFO[item2.model][item2.size];
        body.camisa_2 = JERSEYS[item2.jersey].title;
        body.versao_2 = JERSEYS[item2.jersey].subtitle;
        body.modelagem_2 = item2.model;
        body.tamanho_2 = item2.size;
        body.numero_2 = item2.numeroOpcao === 'com' ? item2.numeroCamisa : 'sem número';
        body.personalizar_nome_2 = item2.nomePersonalizado.trim() || 'não informado';
        body.peitoral_2 = `${item2Info.peitoral} cm`;
        body.comprimento_2 = `${item2Info.comprimento} cm`;
        body.referencia_2 = item2Info.referencia;
      }

      const response = await fetch('https://formsubmit.co/ajax/prosperidadefutebolclube@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Não foi possível enviar o pedido. Tente novamente.');
      }
    } catch {
      alert('Erro ao enviar o pedido. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  const renderItemBlock = (
    title: string,
    item: ItemState,
    setItem: React.Dispatch<React.SetStateAction<ItemState>>,
    prefix: string
  ) => {
    const currentSizeInfo = item.size ? SIZE_INFO[item.model][item.size] : null;

    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-5 space-y-5">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">
          {title}
        </h3>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Escolha a camisa
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {availableJerseys.map(([key, jersey]) => {
              const active = item.jersey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setItem((prev) => ({ ...prev, jersey: key as JerseyKey }))}
                  className={`group text-left rounded-3xl overflow-hidden border-2 transition-all ${
                    active
                      ? 'border-prosperidade-red shadow-lg shadow-prosperidade-red/20 scale-[1.01]'
                      : 'border-gray-200 hover:border-prosperidade-red/50'
                  }`}
                >
                  <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                    <SmartImage
                      basePath={jersey.basePath}
                      alt={jersey.title}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <p className="text-sm font-black uppercase tracking-[0.12em] text-gray-900">
                      {jersey.title}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-[0.15em] mt-1">
                      {jersey.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {errors[`${prefix}_camisa`] && <p className="text-red-500 text-xs mt-3">{errors[`${prefix}_camisa`]}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setItem((prev) => ({ ...prev, model: 'masculino' }))}
            className={`rounded-2xl px-4 py-4 border-2 text-sm font-black uppercase tracking-[0.12em] transition-all ${
              item.model === 'masculino'
                ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/40'
            }`}
          >
            Masculino
          </button>

          <button
            type="button"
            onClick={() => setItem((prev) => ({ ...prev, model: 'feminino' }))}
            className={`rounded-2xl px-4 py-4 border-2 text-sm font-black uppercase tracking-[0.12em] transition-all ${
              item.model === 'feminino'
                ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/40'
            }`}
          >
            Feminino
          </button>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Tamanho
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SIZES.map((size) => {
              const active = item.size === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setItem((prev) => ({ ...prev, size }))}
                  className={`py-3 rounded-2xl text-sm font-black uppercase transition-all border-2 ${
                    active
                      ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/50'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {errors[`${prefix}_tamanho`] && <p className="text-red-500 text-xs mt-3">{errors[`${prefix}_tamanho`]}</p>}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Número
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              type="button"
              onClick={() => setItem((prev) => ({ ...prev, numeroOpcao: 'com' }))}
              className={`rounded-2xl px-4 py-4 border-2 text-sm font-black uppercase tracking-[0.12em] transition-all ${
                item.numeroOpcao === 'com'
                  ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/40'
              }`}
            >
              Com número
            </button>

            <button
              type="button"
              onClick={() => setItem((prev) => ({ ...prev, numeroOpcao: 'sem', numeroCamisa: '' }))}
              className={`rounded-2xl px-4 py-4 border-2 text-sm font-black uppercase tracking-[0.12em] transition-all ${
                item.numeroOpcao === 'sem'
                  ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/40'
              }`}
            >
              Sem número
            </button>
          </div>

          {item.numeroOpcao === 'com' && (
            <input
              type="text"
              value={item.numeroCamisa}
              onChange={(e) => setItem((prev) => ({ ...prev, numeroCamisa: e.target.value }))}
              placeholder="Ex: 10"
              className="w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-prosperidade-red/30 border-gray-200"
            />
          )}

          {errors[`${prefix}_numero`] && <p className="text-red-500 text-xs mt-3">{errors[`${prefix}_numero`]}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
            Personalizar nome
          </label>
          <input
            type="text"
            value={item.nomePersonalizado}
            onChange={(e) => setItem((prev) => ({ ...prev, nomePersonalizado: e.target.value }))}
            placeholder="Opcional"
            className="w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-prosperidade-red/30 border-gray-200"
          />
        </div>

        {currentSizeInfo && (
          <div className="rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
            <div className="p-5">
              <h4 className="text-sm font-black uppercase tracking-[0.15em] text-gray-900 mb-4">
                Medidas do tamanho {item.size}
              </h4>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white border border-gray-100 p-4">
                  <span className="text-gray-400 uppercase tracking-wider text-xs">Peitoral</span>
                  <p className="text-gray-900 font-black mt-1">{currentSizeInfo.peitoral} cm</p>
                </div>

                <div className="rounded-2xl bg-white border border-gray-100 p-4">
                  <span className="text-gray-400 uppercase tracking-wider text-xs">Comprimento</span>
                  <p className="text-gray-900 font-black mt-1">{currentSizeInfo.comprimento} cm</p>
                </div>

                <div className="rounded-2xl bg-white border border-gray-100 p-4 col-span-2">
                  <span className="text-gray-400 uppercase tracking-wider text-xs">Referência</span>
                  <p className="text-gray-900 font-black mt-1">{currentSizeInfo.referencia}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-white p-4">
              <SmartImage
                basePath={currentSizeInfo.tabelaBase}
                alt={`Tabela de medidas ${item.model} ${item.size}`}
                className="w-full max-h-[420px] object-contain mx-auto rounded-2xl"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const previewJersey = item1.jersey || item2.jersey;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-7xl max-h-[94vh] overflow-y-auto rounded-[32px] bg-white shadow-2xl">
        <div className="sticky top-0 z-20 bg-gradient-to-r from-prosperidade-red via-red-600 to-prosperidade-red px-6 md:px-8 py-5 rounded-t-[32px]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-white text-2xl md:text-3xl font-black uppercase italic tracking-tight">
            Comprar Camisa 2026
          </h2>
          <p className="text-white/85 text-xs md:text-sm uppercase tracking-[0.22em] mt-1">
            Escolha seu perfil, camisa e personalização
          </p>
        </div>

        {submitted ? (
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Pedido enviado com sucesso</h3>
            <p className="mt-3 text-gray-500">
              Obrigado, <strong>{nome}</strong>. Seu pedido foi enviado para o e-mail de atendimento.
            </p>
            <button
              onClick={onClose}
              className="mt-8 bg-prosperidade-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.18em] text-sm"
            >
              Fechar
            </button>
          </div>
        ) : (
          <div className="p-5 md:p-8 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 mb-4">
                  1. Escolha seu perfil
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(['socio', 'nao-socio'] as MemberType[]).map((type) => {
                    const active = memberType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMemberType(type)}
                        className={`text-left rounded-3xl p-5 border-2 transition-all ${
                          active
                            ? 'border-prosperidade-red bg-white shadow-lg shadow-prosperidade-red/15'
                            : 'border-gray-200 bg-white hover:border-prosperidade-red/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="inline-flex rounded-full bg-yellow-300 text-gray-900 px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">
                            {MEMBER_LABEL[type]}
                          </span>
                          <span className="text-prosperidade-red text-sm font-black">
                            {PRICE_TABLE[type]['1']} / {PRICE_TABLE[type]['2']}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          {MEMBER_DETAILS[type].map((detail) => (
                            <div key={detail} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-5 h-5 rounded-full bg-prosperidade-red/10 text-prosperidade-red flex items-center justify-center text-xs font-black">
                                ✓
                              </span>
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.membro && <p className="text-red-500 text-xs mt-3">{errors.membro}</p>}
              </div>

              {memberType && (
                <>
                  <div className="rounded-3xl border border-gray-100 bg-white p-5">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 mb-4">
                      2. Escolha a quantidade
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {(['1', '2'] as QuantityType[]).map((qty) => {
                        const active = quantity === qty;
                        return (
                          <button
                            key={qty}
                            type="button"
                            onClick={() => setQuantity(qty)}
                            className={`text-left rounded-3xl p-5 border-2 transition-all ${
                              active
                                ? 'border-prosperidade-red bg-white shadow-lg shadow-prosperidade-red/15'
                                : 'border-gray-200 bg-gray-50 hover:border-prosperidade-red/40'
                            }`}
                          >
                            <p className="text-sm md:text-base font-black uppercase tracking-[0.08em] text-gray-900">
                              {qty} {qty === '1' ? 'Camisa' : 'Camisas'}
                            </p>
                            <p className="mt-2 text-prosperidade-red text-xl font-black">
                              {PRICE_TABLE[memberType][qty]}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    {errors.quantidade && <p className="text-red-500 text-xs mt-3">{errors.quantidade}</p>}
                  </div>

                  <div className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 mb-4">
                      3. Seus dados
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                          Nome completo
                        </label>
                        <input
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Seu nome"
                          className="w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-prosperidade-red/30 border-gray-200"
                        />
                        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1.5">
                          Telefone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={telefone}
                          onChange={(e) => setTelefone(formatPhone(e.target.value))}
                          placeholder="(99) 99999-9999"
                          className="w-full border rounded-2xl px-4 py-3 text-sm text-gray-900 bg-white outline-none focus:ring-2 focus:ring-prosperidade-red/30 border-gray-200"
                        />
                        {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                      </div>
                    </div>
                  </div>

                  {memberType === 'socio' && (
                    <div className="rounded-3xl border border-gray-100 bg-white p-5">
                      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800 mb-4">
                        4. Patrocinador
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        {(['sim', 'nao'] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTemPatrocinador(opt)}
                            className={`rounded-2xl px-4 py-4 border-2 text-sm font-black uppercase tracking-[0.12em] transition-all ${
                              temPatrocinador === opt
                                ? 'bg-prosperidade-red text-white border-prosperidade-red shadow-lg shadow-prosperidade-red/20'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-prosperidade-red/40'
                            }`}
                          >
                            {opt === 'sim' ? 'Com patrocinador' : 'Sem patrocinador'}
                          </button>
                        ))}
                      </div>
                      {errors.patrocinador && <p className="text-red-500 text-xs mt-3">{errors.patrocinador}</p>}
                    </div>
                  )}

                  {renderItemBlock('5. Camisa 1', item1, setItem1, 'item1')}
                  {quantity === '2' && renderItemBlock('6. Camisa 2', item2, setItem2, 'item2')}
                </>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-lg sticky top-28">
                <div className="aspect-[4/5] bg-gray-100">
                  {previewJersey ? (
                    <SmartImage
                      basePath={JERSEYS[previewJersey].basePath}
                      alt={JERSEYS[previewJersey].title}
                      className="w-full h-full object-contain bg-white"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center px-6 text-center text-gray-400 font-semibold">
                      Escolha se é sócio ou não, depois selecione a camisa
                    </div>
                  )}
                </div>

                <div className="p-5 border-t border-gray-100">
                  <h4 className="text-sm font-black uppercase tracking-[0.15em] text-gray-900">
                    Resumo do pedido
                  </h4>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-400 uppercase tracking-wider">Perfil</span>
                      <span className="font-bold text-gray-800 text-right">
                        {memberType ? MEMBER_LABEL[memberType] : 'Não selecionado'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-400 uppercase tracking-wider">Quantidade</span>
                      <span className="font-bold text-gray-800 text-right">
                        {quantity ? `${quantity} ${quantity === '1' ? 'camisa' : 'camisas'}` : 'Não selecionada'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-400 uppercase tracking-wider">Patrocinador</span>
                      <span className="font-bold text-gray-800 text-right">
                        {memberType === 'socio'
                          ? temPatrocinador === 'sim'
                            ? 'Sim'
                            : temPatrocinador === 'nao'
                            ? 'Não'
                            : 'Não selecionado'
                          : 'Não se aplica'}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <span className="text-gray-400 uppercase tracking-wider">Valor</span>
                      <span className="font-black text-prosperidade-red text-right">
                        {selectedPrice || '--'}
                      </span>
                    </div>
                  </div>

                  {item1.jersey && (
                    <div className="mt-5 rounded-2xl border border-gray-100 p-4 bg-gray-50">
                      <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-900 mb-3">
                        Camisa 1
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Modelo</span>
                          <span className="font-bold text-gray-800 text-right">
                            {JERSEYS[item1.jersey].title} · {JERSEYS[item1.jersey].subtitle}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Modelagem</span>
                          <span className="font-bold text-gray-800 text-right capitalize">{item1.model}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Tamanho</span>
                          <span className="font-bold text-gray-800 text-right">{item1.size || '--'}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Número</span>
                          <span className="font-bold text-gray-800 text-right">
                            {item1.numeroOpcao === 'com'
                              ? item1.numeroCamisa || 'Não informado'
                              : item1.numeroOpcao === 'sem'
                              ? 'Sem número'
                              : '--'}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Nome</span>
                          <span className="font-bold text-gray-800 text-right">
                            {item1.nomePersonalizado || 'Sem personalização'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {quantity === '2' && item2.jersey && (
                    <div className="mt-4 rounded-2xl border border-gray-100 p-4 bg-gray-50">
                      <p className="text-xs font-black uppercase tracking-[0.15em] text-gray-900 mb-3">
                        Camisa 2
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Modelo</span>
                          <span className="font-bold text-gray-800 text-right">
                            {JERSEYS[item2.jersey].title} · {JERSEYS[item2.jersey].subtitle}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Modelagem</span>
                          <span className="font-bold text-gray-800 text-right capitalize">{item2.model}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Tamanho</span>
                          <span className="font-bold text-gray-800 text-right">{item2.size || '--'}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Número</span>
                          <span className="font-bold text-gray-800 text-right">
                            {item2.numeroOpcao === 'com'
                              ? item2.numeroCamisa || 'Não informado'
                              : item2.numeroOpcao === 'sem'
                              ? 'Sem número'
                              : '--'}
                          </span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 uppercase tracking-wider">Nome</span>
                          <span className="font-bold text-gray-800 text-right">
                            {item2.nomePersonalizado || 'Sem personalização'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleEmailSubmit}
                    disabled={sending}
                    className="w-full bg-prosperidade-red hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black uppercase tracking-[0.2em] py-4 rounded-2xl transition-all shadow-xl shadow-prosperidade-red/20"
                  >
                    {sending ? 'Enviando...' : 'Enviar pedido'}
                  </button>

                  <p className="text-center text-[11px] text-gray-400 mt-3">
                    Pode ocorrer pequena variação nas medidas finais da camisa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};