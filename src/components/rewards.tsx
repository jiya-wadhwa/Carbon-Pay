"use client";

import { useApp } from "@/hooks/use-app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rewards } from "@/data/mock-data";
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";

export default function Rewards() {
    const { userPoints, setUserPoints } = useApp();
    const { toast } = useToast();

    const handleRedeem = (points: number) => {
        if (userPoints >= points) {
            setUserPoints(current => current - points);
            toast({
                title: "Reward Redeemed!",
                description: `You've successfully redeemed a reward. ${points} points have been deducted.`,
            });
        }
    };

    return (
        <div className="grid gap-6">
            <div className="flex flex-col gap-1">
                <h2 className="font-headline text-3xl font-bold tracking-tight">Eco-Rewards</h2>
                <p className="text-muted-foreground">Redeem your points for rewards from our sustainable partners.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rewards.map((reward) => (
                    <Card key={reward.id} className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="relative aspect-[2/1] w-full mb-4">
                               <Image src={reward.logoUrl} alt={reward.brand} layout="fill" objectFit="contain" className="rounded-t-lg" data-ai-hint={reward.logoHint || 'brand logo'} />
                            </div>
                            <CardDescription>{reward.brand}</CardDescription>
                            <CardTitle className="font-headline text-xl">{reward.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" disabled={userPoints < reward.points} onClick={() => handleRedeem(reward.points)}>
                                Redeem for {reward.points} Points
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
