import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function FirebaseLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // On success, you can redirect or send token to Laravel if needed
            console.log('Signed in:', userCredential.user.uid);
            // Example: redirect to dashboard
            router.visit('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Head title="Firebase Login" />

            <form className="w-full max-w-md space-y-4" onSubmit={submit}>
                <h1 className="text-2xl font-semibold">Sign in with Firebase</h1>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {error && <div className="text-sm text-destructive">{error}</div>}

                <Button type="submit">Sign in</Button>
            </form>
        </div>
    );
}
