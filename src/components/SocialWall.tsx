import React, { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';
import { auth, db, signInWithGoogle, logout } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Send, Image as ImageIcon, LogOut, User as UserIcon, Camera, X, RefreshCw } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

interface Post {
  id: string;
  authorName: string;
  message: string;
  imageUrl: string;
  createdAt: Timestamp;
  uid: string;
}

export default function SocialWall() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setPosts([]);
      return;
    }

    const path = 'posts';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user]);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
        tenantId: auth.currentUser?.tenantId,
        providerInfo: auth.currentUser?.providerData.map(provider => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL
        })) || []
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("No se pudo acceder a la cámara. Por favor verifica los permisos.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        setImageUrl(dataUrl);
        stopCamera();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = capturedImage || imageUrl.trim();
    if (!user || !newMessage.trim() || !finalImageUrl || isSubmitting) return;

    setIsSubmitting(true);
    const path = 'posts';
    try {
      await addDoc(collection(db, path), {
        authorName: user.displayName || 'Invitado',
        message: newMessage.trim(),
        imageUrl: finalImageUrl,
        createdAt: serverTimestamp(),
        uid: user.uid
      });
      setNewMessage('');
      setImageUrl('');
      setCapturedImage(null);
      setShowForm(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="muro" className="py-24 bg-beige-50 relative">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 text-lavender-900">Muro de Vianka</h2>
          <p className="text-lavender-700 italic text-sm md:text-base">Comparte tus fotos y mejores deseos en esta noche especial</p>
        </div>

        {!user ? (
          <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-lavender-200 text-center shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-lavender-200">
              <Camera className="w-8 h-8 md:w-10 md:h-10 text-lavender-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif mb-4 text-lavender-900">¡Captura el momento!</h3>
            <p className="text-lavender-700 mb-8 max-w-md mx-auto text-sm md:text-base">
              Inicia sesión con tu cuenta de Google para poder compartir tus fotografías en el muro de Vianka.
            </p>
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-3 bg-white text-lavender-900 px-6 md:px-8 py-3 rounded-full hover:bg-beige-50 transition-colors mx-auto shadow-xl font-bold uppercase tracking-widest text-[10px] md:text-xs border border-lavender-100"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4 md:w-5 md:h-5" />
              Continuar con Google
            </button>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {/* User Info & Post Trigger */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-lavender-200 shadow-xl">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-lavender-300" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-lavender-100 rounded-full flex items-center justify-center border border-lavender-200">
                    <UserIcon className="w-5 h-5 md:w-6 md:h-6 text-lavender-600" />
                  </div>
                )}
                <div>
                  <p className="text-xs md:text-sm font-bold text-lavender-900">{user.displayName}</p>
                  <button onClick={logout} className="text-[10px] text-lavender-500 hover:text-red-400 transition-colors flex items-center gap-1">
                    <LogOut className="w-3 h-3" /> Cerrar sesión
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  if (showForm) {
                    stopCamera();
                    setCapturedImage(null);
                  }
                }}
                className="bg-lavender-600 text-white px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-lavender-500 transition-all shadow-lg border border-lavender-400/30"
              >
                {showForm ? 'Cancelar' : 'Compartir Foto'}
              </button>
            </div>

            {/* Post Form */}
            <AnimatePresence>
              {showForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-lavender-200 shadow-2xl overflow-hidden"
                >
                  <div className="mb-6">
                    {isCameraOpen ? (
                      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-lavender-300">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
                          >
                            <div className="w-12 h-12 rounded-full border-2 border-lavender-900" />
                          </button>
                          <button
                            type="button"
                            onClick={stopCamera}
                            className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-2xl"
                          >
                            <X className="w-7 h-7" />
                          </button>
                        </div>
                      </div>
                    ) : capturedImage ? (
                      <div className="relative rounded-2xl overflow-hidden aspect-video border border-lavender-300">
                        <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setCapturedImage(null)}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={startCamera}
                          className="flex flex-col items-center justify-center gap-3 p-8 bg-beige-50/50 border-2 border-dashed border-lavender-300 rounded-2xl hover:bg-lavender-50 transition-all group"
                        >
                          <Camera className="w-10 h-10 text-lavender-500 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-bold uppercase tracking-widest text-lavender-600">Tomar Foto</span>
                        </button>
                        <div className="relative">
                          <div className="flex flex-col items-center justify-center gap-3 p-8 bg-beige-50/50 border-2 border-dashed border-lavender-300 rounded-2xl h-full group">
                            <ImageIcon className="w-10 h-10 text-lavender-500 group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold uppercase tracking-widest text-lavender-600">Pegar URL</span>
                            <input
                              type="url"
                              value={imageUrl}
                              onChange={(e) => setImageUrl(e.target.value)}
                              placeholder="https://..."
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un pie de foto para Vianka..."
                    className="w-full p-5 bg-beige-50/50 border border-lavender-200 rounded-2xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent outline-none resize-none min-h-[120px] mb-6 text-lavender-900 placeholder:text-lavender-300"
                    required
                  />
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !newMessage.trim() || (!capturedImage && !imageUrl.trim())}
                    className="w-full bg-lavender-600 text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-lavender-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl border border-lavender-400/30"
                  >
                    {isSubmitting ? 'Publicando...' : <><Send className="w-4 h-4" /> Publicar en el Muro</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <canvas ref={canvasRef} className="hidden" />

            {/* Posts Feed */}
            <div className="grid gap-12">
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/60 backdrop-blur-sm rounded-3xl border border-lavender-200 shadow-2xl overflow-hidden"
                  >
                    <div className="w-full aspect-video overflow-hidden relative">
                      <img 
                        src={post.imageUrl} 
                        alt="Post" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lavender-900/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 bg-lavender-100 rounded-full flex items-center justify-center text-lavender-600 font-bold text-sm border border-lavender-200">
                          {post.authorName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-lavender-900">{post.authorName}</p>
                          <p className="text-[10px] text-lavender-500 uppercase tracking-[0.2em]">
                            {post.createdAt?.toDate().toLocaleDateString('es-MX', { 
                              day: 'numeric', 
                              month: 'long', 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-lavender-800 leading-relaxed italic border-l-2 border-lavender-400 pl-6 text-lg">
                        "{post.message}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {posts.length === 0 && (
                <div className="text-center py-20 text-lavender-400 italic tracking-widest">
                  Aún no hay fotos. ¡Sé el primero en capturar un momento!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
