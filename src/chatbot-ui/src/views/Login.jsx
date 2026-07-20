import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router';

import { addUser } from '../api/chat';

export default function Login(setUser) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // 1. Create a brand new user account in Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Registered User ID:", userCredential.user.uid);
        
        // TODO: This is where we will eventually send the userCredential.user.uid to your SQLite backend!
        addUser(userCredential.user.uid, userCredential.user.email);
        setUser(userCredential.user.uid);
      } else {
        // 2. Sign in an existing user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged In User ID:", userCredential.user.uid);
        setUser(userCredential.user.uid);
      }

      // 3. Send the user to the chat screen upon success
      navigate('/');
      
    } catch (err) {
      // Catch errors like "wrong password" or "email already in use"
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0b0f] font-sans text-white p-4">
        <div className="w-full max-w-[420px] rounded-2xl border border-[#27273a] bg-[#13131a] p-8 text-center">
        
            {/* Chatbot Icon Placeholder */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-xl font-bold tracking-wider text-white border border-white/10">
            G
            </div>

            {/* Dynamic Title Headers */}
            <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">
            {isRegistering ? 'Create an Account' : 'Sign In to GeorgeGPT'}
            </h2>
            
            <p className="text-sm text-[#808191] mb-8">
            {isRegistering ? 'Get started with your AI assistant.' : 'Welcome back! Please enter your details.'}
            </p>

            {/* Error Alert Box */}
            {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400 border border-red-500/20 text-left">
                {error}
            </div>
            )}

            {/* Form Inputs & Submit Button */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="w-full rounded-xl border border-[#32324d] bg-[#1c1c24] px-4 py-3.5 text-base text-white placeholder-[#51526c] outline-none transition focus:border-white/40 focus:bg-[#22222c]"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full rounded-xl border border-[#32324d] bg-[#1c1c24] px-4 py-3.5 text-base text-white placeholder-[#51526c] outline-none transition focus:border-white/40 focus:bg-[#22222c]"
            />
            
            <button 
                type="submit" 
                className="mt-2 w-full rounded-xl bg-white py-3.5 text-base font-semibold text-[#0b0b0f] transition hover:bg-neutral-200 active:scale-[0.99]"
            >
                {isRegistering ? 'Sign Up' : 'Log In'}
            </button>
            </form>

            {/* Toggle Form Type Footer */}
            <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            className="mt-6 text-sm text-[#a1a1aa] underline decoration-neutral-700 underline-offset-4 hover:text-white transition"
            >
            {isRegistering ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
            </button>
        </div>
    </div>
  );


//   return (
//     <main className="flex min-h-screen bg-black items-center">
//         <div className="flex w-200 my-25 mx-auto p-5 border border-[#ccc] rounded-lg text-white flex-col">
//             <h1 className='text-3xl mb-5'>{isRegistering ? 'Create an Account' : 'Sign In to GeorgeGPT'}</h1>
            
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             <form onSubmit={handleSubmit} className="flex flex-col gap-3.75">
//                 <input 
//                 type="email" 
//                 placeholder="Email Address" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//                 />
//                 <input 
//                 type="password" 
//                 placeholder="Password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//                 />
//                 <button className="cursor-pointer" type="submit">
//                 {isRegistering ? 'Sign Up' : 'Log In'}
//                 </button>
//             </form>

//             <button 
//                 onClick={() => setIsRegistering(!isRegistering)} 
//                 style={{ marginTop: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
//             >
//                 {isRegistering ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
//             </button>
//         </div>
//     </main>
    
//   );
}
