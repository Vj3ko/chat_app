import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
//Scss
import './App.scss';
//Components
import Login from './Components/Login/Login';
import Spinner from './Components/Spinner/Spinner';
import { UserContext } from './Context/ChatContext';
import { DroneContext } from './Context/DroneContext';
//Animations
import { chatVariant, scaleVariant } from './AnimationVariants/index';
//Lazy loading component
const Chat = lazy(async () => {
  const [moduleExports] = await Promise.all([
    import('./Components/Chat/Chat'),
    new Promise(resolve => setTimeout(resolve, 3000)),
  ]);
  return moduleExports;
});

export default function App() {
  const [user, setUser] = useState(null);
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (user) {
      document.title = `Chat | ${user.username}`;
    } else {
      document.title = 'Chat App';
    }
  }, [user]);

  return (
    <div className='wrapper'>
      <AnimatePresence mode='wait'>
        {!user ? (
          <motion.div
            variants={scaleVariant}
            key='login'
            initial='hide'
            animate='show'
            exit='exit'
          >
            <Login setUser={setUser} />
          </motion.div>
        ) : (
          <Suspense
            fallback={
              <motion.div
                variants={scaleVariant}
                key='spinner'
                initial='hide'
                animate='show'
              >
                <Spinner />
              </motion.div>
            }
          >
            <motion.div
              variants={chatVariant}
              key='chat'
              initial='hide'
              animate='show'
              exit='exit'
              className='container'
            >
              <UserContext.Provider value={{ user, setUser }}>
                <DroneContext.Provider value={{ drone, setDrone }}>
                  <Chat />
                </DroneContext.Provider>
              </UserContext.Provider>
            </motion.div>
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
