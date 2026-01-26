import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';

import { planService } from '@/lib/plans/service';
import { getUser } from '@/lib/supabase/server';
import PlanIdClient from './PlanIdClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const user = await getUser();

  if (!user) {
    return {
      title: 'ログインが必要です',
    };
  }

  const result = await planService.getPlanById(id, user.id);

  if (!result.success || !result.plan) {
    return {
      title: 'プランが見つかりません',
    };
  }

  const { plan } = result;

  return {
    title: plan.destination ? `${plan.destination}の旅行プラン` : '旅行プラン',
    description: plan.itinerary?.description || 'AIが生成した旅行プラン',
    openGraph: {
      title: plan.destination ? `${plan.destination}の旅行プラン` : '旅行プラン',
      description: plan.itinerary?.description || 'AIが生成した旅行プラン',
      images: plan.thumbnailUrl ? [{ url: plan.thumbnailUrl }] : undefined,
    },
  };
}

export default async function PlanIdPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect(`/auth/login?redirect=/plan/id/${id}`);
  }

  const result = await planService.getPlanById(id, user.id);

  if (!result.success || !result.plan) {
    notFound();
  }

  const { plan } = result;

  if (!plan.input || !plan.itinerary) {
    notFound();
  }

  return (
    <PlanIdClient
      plan={plan}
      input={plan.input}
      itinerary={plan.itinerary}
      planId={id}
    />
  );
}
