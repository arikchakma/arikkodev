import { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function QuickChatButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'chat' });
      cal('ui', {
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="chat"
      data-cal-link="arikchakma/chat"
      data-cal-config='{"layout":"month_view"}'
      className="inline-flex items-center gap-2 underline underline-offset-4 transition-colors [font-variation-settings:'wght'_500] hover:text-zinc-600"
      onClick={() => {
        window.seline.track('clicked:quick_chat_button');
      }}
    >
      Book a 15-minute chat →
    </button>
  );
}
