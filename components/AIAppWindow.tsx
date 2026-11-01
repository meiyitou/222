import React, { useState } from 'react';
import { ArrowUp, Plus } from 'lucide-react';

type AIAppId = 'chatgpt' | 'gemini' | 'claude' | 'deepseek';

const themes: Record<AIAppId, {
  name: string; greeting: string; description: string;
  background: string; surface: string; accent: string; text: string; suggestions: string[];
}> = {
  chatgpt: {
    name: 'ChatGPT', greeting: '有什么可以帮你？',
    description: '从一个想法开始，继续探索。', background: '#f7f7f5',
    surface: '#ffffff', accent: '#173f35', text: '#202522',
    suggestions: ['帮我整理一个想法', '写一段有趣的文案', '解释一个新概念'],
  },
  gemini: {
    name: 'Gemini', greeting: '你好，今天想探索什么？',
    description: '灵感、计划和问题，都可以从这里开始。',
    background: 'linear-gradient(135deg, #f7f8ff 0%, #eceeff 55%, #fff2f8 100%)',
    surface: '#ffffff', accent: '#6257c8', text: '#292945',
    suggestions: ['给我一些创意灵感', '规划一次周末出行', '帮我理解一张图片'],
  },
  claude: {
    name: 'Claude', greeting: '一起把想法写出来。',
    description: '留一点空间，认真思考下一步。', background: '#f6f1e9',
    surface: '#fffcf7', accent: '#b75f46', text: '#372e28',
    suggestions: ['润色一段文字', '梳理一篇长文', '讨论一个设计方向'],
  },
  deepseek: {
    name: 'DeepSeek', greeting: '从问题出发，深入探索。',
    description: '搜索、推理、整理思路。',
    background: 'linear-gradient(145deg, #eff6ff 0%, #e5efff 100%)',
    surface: '#ffffff', accent: '#1459b9', text: '#183455',
    suggestions: ['分析一个复杂问题', '帮我检查一段代码', '整理资料要点'],
  },
};

const AppMark: React.FC<{ appId: AIAppId; accent: string; size?: 'small' | 'large' }> = ({ appId, accent, size = 'small' }) => (
  <span
    className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${size === 'large' ? 'h-14 w-14 rounded-2xl shadow-lg' : 'h-8 w-8'}`}
    style={{ background: accent }}
  >
    <img
      src={`/ai-icons/${appId}.svg`}
      alt=""
      className={appId === 'chatgpt' ? 'h-full w-full object-cover' : size === 'large' ? 'h-9 w-9' : 'h-5 w-5'}
    />
  </span>
);

const AIAppWindow: React.FC<{ appId: AIAppId }> = ({ appId }) => {
  const theme = themes[appId];
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('');

  const send = (value: string) => {
    const next = value.trim();
    if (!next) return;
    setPrompt(next);
    setInput('');
  };

  return (
    <div className="flex flex-1 min-h-0 font-sans" style={{ color: theme.text, background: theme.background }}>
      <aside className="hidden md:flex w-48 shrink-0 flex-col border-r border-black/10 bg-black/[0.035] p-4">
        <div className="flex items-center gap-2 font-semibold text-sm mb-7">
          <AppMark appId={appId} accent={theme.accent} />
          {theme.name}
        </div>
        <button type="button" onClick={() => setPrompt('')} className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2 text-left text-xs font-medium hover:bg-white/60">
          <Plus className="w-4 h-4" /> 新对话
        </button>
        <p className="mt-auto text-[11px] leading-5 opacity-55">界面交互演示<br />尚未连接真实 AI 模型</p>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col p-4 md:p-7">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold md:hidden">
            <AppMark appId={appId} accent={theme.accent} />{theme.name}
          </div>
          <div className="hidden md:block text-xs font-semibold tracking-wide opacity-60">{theme.name} · 界面预览</div>
          <span className="rounded-full border border-black/10 bg-white/60 px-2.5 py-1 text-[11px] opacity-65">演示模式</span>
        </header>

        <div className="flex flex-1 min-h-0 flex-col items-center justify-center overflow-y-auto py-7">
          {prompt ? (
            <div className="w-full max-w-xl space-y-5">
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm" style={{ background: theme.surface }}>{prompt}</div>
              <div className="flex items-start gap-3 text-sm leading-6">
                <AppMark appId={appId} accent={theme.accent} />
                <p className="pt-1">这是 {theme.name} 风格的交互演示窗口。接入模型后，真实回复会显示在这里。</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl text-center">
              <div className="mb-5 flex justify-center"><AppMark appId={appId} accent={theme.accent} size="large" /></div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{theme.greeting}</h2>
              <p className="mt-3 text-sm opacity-60">{theme.description}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {theme.suggestions.map(suggestion => (
                  <button key={suggestion} type="button" onClick={() => send(suggestion)} className="rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-xs text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={e => { e.preventDefault(); send(input); }} className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-2xl border border-black/10 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" style={{ background: theme.surface }}>
          <input aria-label={`向 ${theme.name} 输入内容`} value={input} onChange={e => setInput(e.target.value)} placeholder={`向 ${theme.name} 提问…`} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-black/35" />
          <button type="submit" aria-label="发送" disabled={!input.trim()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white disabled:opacity-40" style={{ background: theme.accent }}><ArrowUp className="h-4 w-4" /></button>
        </form>
        <p className="mt-2 text-center text-[10px] opacity-45 md:hidden">界面演示，尚未连接真实 AI 模型</p>
      </main>
    </div>
  );
};

export default AIAppWindow;
