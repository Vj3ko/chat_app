import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useState } from "react";
//Scss
import "./App.scss";
//Components
import Login from "./Components/Login/Login";
import Spinner from "./Components/Spinner/Spinner";
import { UserContext } from "./Context/ChatContext";
import { DroneContext } from "./Context/DroneContext";
//Animations
import {
  chatVariant,
  loginVariant,
  spinnerVariant,
} from "./AnimationVariants/index";
//Lazy loading component
const Chat = lazy(() => {
  return Promise.all([
    import("./Components/Chat/Chat"),
    new Promise((resolve) => setTimeout(resolve, 2000)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function App() {
  const [user, setUser] = useState(null);
  const [drone, setDrone] = useState(null);

  return (
    <div className='wrapper'>
      <AnimatePresence mode='wait'>
        {!user ? (
          <motion.div
            variants={loginVariant}
            key='login'
            initial='hide'
            animate='show'
            exit='exit'
          >
            <UserContext.Provider value={{ setUser }}>
              <Login />
            </UserContext.Provider>
          </motion.div>
        ) : (
          <Suspense
            fallback={
              <motion.div
                variants={spinnerVariant}
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
