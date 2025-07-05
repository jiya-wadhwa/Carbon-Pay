"use client";

import { useApp } from "@/hooks/use-app";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rewards } from "@/data/mock-data";
import Image from 'next/image';

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
                               <Image src={reward.logoUrl} alt={reward.brand} layout="fill" objectFit="contain" className="rounded-t-lg" data-ai-hint="logo company" />
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

// Dummy useToast for compilation. It is provided by shadcn.
import * as React from "react"
import type { ToastActionElement, ToastProps, } from "@/components/ui/toast"
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
type ToasterToast = ToastProps & { id: string; title?: React.ReactNode; description?: React.ReactNode; action?: ToastActionElement; };
const actionTypes = { ADD_TOAST: "ADD_TOAST", UPDATE_TOAST: "UPDATE_TOAST", DISMISS_TOAST: "DISMISS_TOAST", REMOVE_TOAST: "REMOVE_TOAST", } as const;
let count = 0;
function genId() { count = (count + 1) % Number.MAX_SAFE_INTEGER; return count.toString(); }
type ActionType = typeof actionTypes;
type Action = | { type: ActionType["ADD_TOAST"]; toast: ToasterToast } | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> } | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] } | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] };
interface State { toasts: ToasterToast[] }
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const addToRemoveQueue = (toastId: string) => { if (toastTimeouts.has(toastId)) { return } const timeout = setTimeout(() => { toastTimeouts.delete(toastId); dispatch({ type: "REMOVE_TOAST", toastId: toastId, }) }, TOAST_REMOVE_DELAY); toastTimeouts.set(toastId, timeout) };
const reducer = (state: State, action: Action): State => { switch (action.type) { case "ADD_TOAST": return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT), }; case "UPDATE_TOAST": return { ...state, toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t), }; case "DISMISS_TOAST": { const { toastId } = action; if (toastId) { addToRemoveQueue(toastId) } else { state.toasts.forEach((toast) => { addToRemoveQueue(toast.id) }) } return { ...state, toasts: state.toasts.map((t) => t.id === toastId || toastId === undefined ? { ...t, open: false, } : t), } } case "REMOVE_TOAST": if (action.toastId === undefined) { return { ...state, toasts: [], } } return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId), } } };
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };
function dispatch(action: Action) { memoryState = reducer(memoryState, action); listeners.forEach((listener) => { listener(memoryState) }) }
type Toast = Omit<ToasterToast, "id">;
function toast({ ...props }: Toast) { const id = genId(); const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id }, }); const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id }); dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss() }, }, }); return { id: id, dismiss, update, } }
function useToast() { const [state, setState] = React.useState<State>(memoryState); React.useEffect(() => { listeners.push(setState); return () => { const index = listeners.indexOf(setState); if (index > -1) { listeners.splice(index, 1) } } }, [state]); return { ...state, toast, dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), } }
