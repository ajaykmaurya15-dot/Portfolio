import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, ChevronRight, Battery, Zap, Heart, Flower2 } from 'lucide-react';
import { Box, Tooltip, Typography, Paper, Button, IconButton, alpha, useTheme } from '@mui/material';

type Mood = 'neutral' | 'happy' | 'shy' | 'angry' | 'hungry' | 'sad';

const TOUR_STEPS = [
  {
    id: 'home',
    message: "Yum! Fully charged! Let's explore Ajay's journey!",
    target: '#hero-heading'
  },
  {
    id: 'about',
    message: "Learn about Ajay's background and engineering drive.",
    target: '#about-heading'
  },
  {
    id: 'skills',
    message: "Technical tools for scalable industrial solutions.",
    target: '#skills-heading'
  },
  {
    id: 'experience',
    message: "5+ years at top firms like TCS and HERE.",
    target: '#experience-heading'
  },
  {
    id: 'projects',
    message: "Featured projects: MES, SCADA, and more.",
    target: '#projects-heading'
  },
  {
    id: 'contact',
    message: "Ready to collaborate? Reach out here!",
    target: '#contact-heading'
  }
];

export const Megami: React.FC = () => {
  const theme = useTheme();
  const [transientMood, setTransientMood] = useState<Mood | null>(null);
  const [isTouring, setIsTouring] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isHoldingFood, setIsHoldingFood] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const fullTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [tourFromFood, setTourFromFood] = useState(false);
  const [tourFromHeart, setTourFromHeart] = useState(false);
  const [isHoldingHeart, setIsHoldingHeart] = useState(false);
  const [heartColor, setHeartColor] = useState('#f472b6');
  const [heartMessage, setHeartMessage] = useState('');
  const [isGivingRose, setIsGivingRose] = useState(false);
  const [roseColor, setRoseColor] = useState('#ef4444');
  const [megamiPos, setMegamiPos] = useState({ x: 100, y: 100 });
  const [foodPos, setFoodPos] = useState({ x: 0, y: 0 });
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 });
  const [captureStiffness, setCaptureStiffness] = useState(15);
  const [clickCount, setClickCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasShownHungerMessage, setHasShownHungerMessage] = useState(false);
  const [hasShownNiceMessage, setHasShownNiceMessage] = useState(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isTouringRef = useRef(false);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (fullTimerRef.current) clearTimeout(fullTimerRef.current);
    };
  }, []);

  useEffect(() => {
    isTouringRef.current = isTouring;
  }, [isTouring]);

  // Auto-clear heart message after 5 seconds if not touring
  useEffect(() => {
    if (heartMessage && !isTouring) {
      const timer = setTimeout(() => {
        setHeartMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [heartMessage, isTouring]);

  const mood: Mood = React.useMemo(() => {
    if (transientMood) return transientMood;
    if (isTouring) return 'neutral';
    if (isHoldingFood) return 'hungry';
    if (!isFull) return 'sad';
    if (isHoldingHeart || heartCount > 3) return 'shy';
    
    return 'neutral';
  }, [transientMood, isTouring, isFull, isHoldingFood, isHoldingHeart, heartCount]);

  // Handle default messages
  useEffect(() => {
    if (isTouring) return;
    
    if (!isFull && !heartMessage && !hasShownHungerMessage) {
      // Short hunger message
      const timer = setTimeout(() => {
        setHeartMessage("Feed me! ⚡");
        setHasShownHungerMessage(true);
      }, 0);
      return () => clearTimeout(timer);
    } else if (heartCount > 3 && !heartMessage && isFull && !hasShownNiceMessage) {
      const timer = setTimeout(() => {
        setHeartMessage("You're so nice! ❤️");
        setHasShownNiceMessage(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isFull, heartCount, heartMessage, isTouring, hasShownNiceMessage, hasShownHungerMessage]);

  // Reset message flags
  useEffect(() => {
    if (isFull) {
      const timer = setTimeout(() => setHasShownHungerMessage(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isFull]);

  useEffect(() => {
    const timer = setTimeout(() => setHasShownNiceMessage(false), 0);
    return () => clearTimeout(timer);
  }, [heartCount]);

  const posControls = useAnimation();
  const bodyControls = useAnimation();
  const megamiRef = useRef<HTMLDivElement>(null);

  const goToStep = React.useCallback(async (stepIndex: number, fromFoodOverride?: boolean, fromHeartOverride?: boolean) => {
    const step = TOUR_STEPS[stepIndex];
    const element = document.querySelector(step.target);
    
    const isFromFood = fromFoodOverride !== undefined ? fromFoodOverride : tourFromFood;
    const isFromHeart = fromHeartOverride !== undefined ? fromHeartOverride : tourFromHeart;

    if (element) {
      const headerOffset = 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Position based on origin
      let targetX = 20;
      let targetY = 150;
      
      if (isFromFood || isFromHeart) {
        targetX = window.innerWidth - 70;
        targetY = 150;
      }

      await posControls.start({
        x: targetX,
        y: targetY,
        transition: { duration: 0.3, ease: "easeOut" }
      });
      bodyControls.start({
        scale: 1,
        rotate: 0,
        y: 0,
        transition: { duration: 0.3 }
      });
    }
  }, [posControls, bodyControls, tourFromFood, tourFromHeart]);

  const startTour = React.useCallback((fromFood: boolean = false, fromHeart: boolean = false) => {
    setIsTouring(true);
    setTourFromFood(fromFood);
    setTourFromHeart(fromHeart);
    setCurrentStep(0);
    goToStep(0, fromFood, fromHeart);
  }, [goToStep]);

  const feedMegami = React.useCallback(() => {
    setIsHoldingFood(false);
    setTransientMood('happy');
    setTourFromFood(true);
    setIsFull(true);
    setHeartCount(0); // Reset heart count when fed

    // Clear existing timer if any
    if (fullTimerRef.current) clearTimeout(fullTimerRef.current);
    
    // Set 5-minute timer (300,000 ms)
    fullTimerRef.current = setTimeout(() => {
      setIsFull(false);
    }, 300000);

    bodyControls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 720],
      transition: { duration: 0.3 }
    }).then(() => {
      setTransientMood(null);
      startTour(true);
    });
  }, [bodyControls, startTour]);

  const giveRose = React.useCallback(() => {
    const roseColors = ['#ef4444', '#f472b6', '#ec4899', '#db2777', '#be185d'];
    setRoseColor(roseColors[Math.floor(Math.random() * roseColors.length)]);
    setIsGivingRose(true);
    setTransientMood('happy');
    setTimeout(() => {
      setIsGivingRose(false);
      setTransientMood(null);
    }, 3000);
  }, []);

  const handleHeartInteraction = React.useCallback(() => {
    const isRedOrPink = heartColor === '#ef4444' || heartColor === '#f472b6';
    
    setIsHoldingHeart(false);
    setHeartCount(prev => prev + 1);
    
    // Accepted animation on body only to keep text stable
    bodyControls.start({
      y: [0, -20, 0],
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    });

    if (isRedOrPink) {
      setHeartMessage(`A heart! So sweet! 🌹`);
      giveRose();
    } else {
      const colorName = heartColor === '#3b82f6' ? 'blue' : heartColor === '#a855f7' ? 'purple' : 'yellow';
      setHeartMessage(`A ${colorName} heart! Beautiful! ✨`);
      setTransientMood('happy');
      setTimeout(() => {
        setTransientMood(null);
      }, 2000);
    }
  }, [heartColor, giveRose, bodyControls]);

  // Floating items autonomous movement
  useEffect(() => {
    if (!isHoldingFood && !isHoldingHeart) return;

    const interval = setInterval(() => {
      const time = Date.now() / 1000;
      if (isHoldingFood) {
        setFoodPos({
          x: (Math.sin(time * 0.7) * 0.4 + 0.5) * window.innerWidth,
          y: (Math.cos(time * 0.8) * 0.4 + 0.5) * window.innerHeight
        });
      }
      if (isHoldingHeart) {
        setHeartPos({
          x: (Math.cos(time * 0.75) * 0.4 + 0.5) * window.innerWidth,
          y: (Math.sin(time * 0.65) * 0.4 + 0.5) * window.innerHeight
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isHoldingFood, isHoldingHeart]);

  // Megami behavior logic
  useEffect(() => {
    if (isTouring || isDragging) return;

    if (isHoldingFood) {
      const followInterval = setInterval(() => {
        posControls.start({
          x: foodPos.x - 25,
          y: foodPos.y - 25,
          // Fast capture with spring physics
          transition: { type: "spring", stiffness: captureStiffness, damping: 20 }
        });

        const dist = Math.sqrt(Math.pow(foodPos.x - (megamiPos.x + 25), 2) + Math.pow(foodPos.y - (megamiPos.y + 25), 2));
        if (dist < 70) feedMegami();
      }, 16);
      return () => clearInterval(followInterval);
    }

    if (isHoldingHeart) {
      const followInterval = setInterval(() => {
        posControls.start({
          x: heartPos.x - 25,
          y: heartPos.y - 25,
          // Fast capture with spring physics
          transition: { type: "spring", stiffness: captureStiffness, damping: 20 }
        });

        const dist = Math.sqrt(Math.pow(heartPos.x - (megamiPos.x + 25), 2) + Math.pow(heartPos.y - (megamiPos.y + 25), 2));
        if (dist < 70) {
          handleHeartInteraction();
        }
      }, 16);
      return () => clearInterval(followInterval);
    }

  }, [isHoldingFood, isHoldingHeart, foodPos, heartPos, posControls, isTouring, feedMegami, megamiPos.x, megamiPos.y, handleHeartInteraction, captureStiffness, isDragging]);

  // Update internal megami pos more frequently for immediate capture detection
  useEffect(() => {
    const interval = setInterval(() => {
      if (megamiRef.current) {
        const rect = megamiRef.current.getBoundingClientRect();
        const x = rect.left;
        const y = rect.top;
        setMegamiPos({ x, y });
        
        // Dispatch event for text reflow effect
        window.dispatchEvent(new CustomEvent('megami-move', { 
          detail: { x: x + 25, y: y + 25 } 
        }));
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Free Roam Logic
  useEffect(() => {
    if (isTouring || isHoldingFood || isHoldingHeart || mood === 'shy' || isDragging) return;

    let timeoutId: NodeJS.Timeout;
    let isActive = true;

    const moveAround = async () => {
      if (!isActive) return;
      
      let targetX, targetY;
      let duration = 3;

      if (!isFull) {
        const batteryIcon = document.querySelector('#battery-icon');
        if (batteryIcon) {
          const rect = batteryIcon.getBoundingClientRect();
          // Hover near the battery icon (to the left of it)
          targetX = rect.left - 80 + (Math.random() * 40 - 20);
          targetY = rect.top + (Math.random() * 40 - 20);
          duration = 1.5; // Move faster when hungry
        } else {
          targetX = Math.random() * (window.innerWidth - 100) + 50;
          targetY = Math.random() * (window.innerHeight - 100) + 50;
        }
      } else {
        targetX = Math.random() * (window.innerWidth - 100) + 50;
        targetY = Math.random() * (window.innerHeight - 100) + 50;
      }
      
      await posControls.start({
        x: targetX,
        y: targetY,
        transition: { duration, ease: "easeInOut" }
      });
      
      if (isActive) {
        timeoutId = setTimeout(moveAround, isFull ? 3000 : 1000);
      }
    };

    moveAround();
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      if (!isTouringRef.current) {
        posControls.stop();
      }
    };
  }, [isTouring, isHoldingFood, isHoldingHeart, mood, posControls, isDragging, isFull]);

  const endTour = () => {
    setIsTouring(false);
    setTourFromFood(false);
    setTourFromHeart(false);
    setCurrentStep(-1);
    setTransientMood(null);
    posControls.start({ x: 100, y: 100 });
    bodyControls.start({ scale: 1, rotate: 0 });
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      goToStep(next);
    } else {
      endTour();
    }
  };

  const handleMegamiClick = () => {
    if (isTouring || isHoldingFood || isHoldingHeart || isDragging) return;

    // Clear "Feed me" message if it's there
    if (!isFull && heartMessage === "Feed me! ⚡") {
      setHeartMessage('');
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Reset click count after 2 seconds of inactivity
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setClickCount(0), 2000);

    if (newCount >= 3) {
      setTransientMood('angry');
      setHeartMessage("Hey! Stop poking me! 😤");
      bodyControls.start({
        rotate: [0, -20, 20, -20, 20, 0],
        transition: { duration: 0.2 }
      });
      setTimeout(() => {
        setTransientMood(null);
        setHeartMessage('');
        setClickCount(0);
      }, 3000);
    } else {
      // Small jump/wiggle on body instead of container
      setTransientMood('happy');
      setHeartMessage(newCount === 1 ? "Hello! Need help? Click again!" : "Hehe, that tickles!");
      bodyControls.start({
        y: [0, -15, 0],
        transition: { duration: 0.3 }
      });
      
      // If they click twice, we can offer to start the word walk or just wait for the 3rd poke
      if (newCount === 2) {
        // We could start word walk here if we wanted, but the user said "it should not run away"
        // So let's just keep it as a poke interaction.
      }
      
      setTimeout(() => {
        setTransientMood(null);
        if (newCount < 3) setHeartMessage('');
      }, 2000);
    }
  };

  // Continuous mood animations
  useEffect(() => {
    if (isTouring) {
      bodyControls.stop();
      bodyControls.set({ y: 0, rotate: 0, scale: 1 });
      return;
    }

    if (mood === 'angry') {
      bodyControls.start({
        y: [0, -5, 0],
        rotate: [0, 10, -10, 10, 0],
        transition: { repeat: Infinity, duration: 0.2 }
      });
    } else if (mood === 'sad') {
      bodyControls.start({
        y: [0, 2, 0],
        scale: [1, 0.95, 1],
        transition: { repeat: Infinity, duration: 2 }
      });
    } else if (mood !== 'neutral') {
      bodyControls.start({
        y: [0, -5, 0],
        transition: { repeat: Infinity, duration: 0.5 }
      });
    } else {
      // Don't stop if we're in the middle of a transient animation
      if (!transientMood) {
        bodyControls.start({ y: 0, rotate: 0 });
      }
    }
  }, [mood, bodyControls, transientMood, isTouring]);

  const getMoodColor = () => {
    switch (mood) {
      case 'shy': return '#f472b6'; // Pink
      case 'angry': return '#ef4444'; // Red
      case 'happy': return '#10b981'; // Green
      case 'hungry': return '#f59e0b'; // Orange/Yellow
      case 'sad': return '#64748b'; // Slate/Grey
      default: return isTouring ? theme.palette.primary.main : '#94a3b8';
    }
  };

  const toggleHeart = () => {
    if (!isFull) {
      setHeartMessage("Feed me! ⚡");
      setTransientMood('hungry');
      setTimeout(() => {
        setHeartMessage('');
        setTransientMood(null);
      }, 2000);
      return;
    }

    if (!isHoldingHeart) {
      const colors = ['#ef4444', '#f472b6', '#3b82f6', '#a855f7', '#eab308'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setHeartColor(randomColor);
      setHeartMessage("A heart? ❤️");
      setIsHoldingHeart(true);
      setIsHoldingFood(false);
      // Random stiffness between 40 (fast ~2s) and 70 (very fast ~1s)
      setCaptureStiffness(Math.random() * 30 + 40);
    } else {
      setIsHoldingHeart(false);
    }
  };

  return (
    <>
      {/* Interaction UI */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 30, 
        right: 30, 
        zIndex: 10001, 
        display: 'flex', 
        flexDirection: 'column-reverse', 
        gap: 2,
        pointerEvents: 'auto'
      }}>
        <Tooltip title="Feed Megami!" arrow placement="left">
          <IconButton 
            id="battery-icon"
            onClick={() => { 
              const newState = !isHoldingFood;
              setIsHoldingFood(newState); 
              setIsHoldingHeart(false); 
              if (newState) {
                // Random stiffness between 40 (fast ~2s) and 70 (very fast ~1s)
                setCaptureStiffness(Math.random() * 30 + 40);
              }
            }}
            sx={{ 
              width: 50, height: 50, 
              bgcolor: isHoldingFood ? 'warning.main' : alpha(theme.palette.background.paper, 0.8),
              color: isHoldingFood ? 'white' : 'primary.main',
              backdropFilter: 'blur(8px)',
              border: `2px solid ${isHoldingFood ? 'warning.main' : theme.palette.primary.main}`,
              boxShadow: isHoldingFood 
                ? `0 0 20px ${alpha(theme.palette.warning.main, 0.6)}` 
                : `0 4px 15px ${alpha(theme.palette.common.black, 0.1)}`,
              '&:hover': { 
                bgcolor: isHoldingFood ? 'warning.dark' : alpha(theme.palette.background.paper, 0.9),
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {isHoldingFood ? <Zap size={24} /> : <Battery size={24} />}
          </IconButton>
        </Tooltip>

        <AnimatePresence>
          {!isTouring && isFull && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
            >
              <Tooltip title="Give Love!" arrow placement="left">
                <IconButton 
                  onClick={toggleHeart}
                  sx={{ 
                    width: 50, height: 50, 
                    bgcolor: isHoldingHeart ? heartColor : alpha(theme.palette.background.paper, 0.8),
                    color: isHoldingHeart ? 'white' : heartColor,
                    backdropFilter: 'blur(8px)',
                    border: `2px solid ${heartColor}`,
                    boxShadow: isHoldingHeart 
                      ? `0 0 20px ${alpha(heartColor, 0.6)}` 
                      : `0 4px 15px ${alpha(theme.palette.common.black, 0.1)}`,
                    '&:hover': { 
                      bgcolor: isHoldingHeart ? heartColor : alpha(theme.palette.background.paper, 0.9),
                      transform: 'scale(1.05)',
                      filter: 'brightness(1.1)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Heart size={24} fill={isHoldingHeart ? "white" : "none"} />
                </IconButton>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Floating Items */}
      <AnimatePresence>
        {isHoldingFood && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x: foodPos.x - 15, y: foodPos.y - 15 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, pointerEvents: 'none' }}
          >
            <Zap size={30} fill="#FFD700" color="#FFD700" />
          </motion.div>
        )}
        {isHoldingHeart && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x: heartPos.x - 15, y: heartPos.y - 15 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, pointerEvents: 'none' }}
          >
            <Heart size={30} fill={heartColor} color={heartColor} />
          </motion.div>
        )}
      </AnimatePresence>

      <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none' }}>
        <motion.div
          ref={megamiRef}
          drag={!isTouring}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            posControls.set({ x: info.point.x - 25, y: info.point.y - 25 });
          }}
          animate={isDragging ? undefined : posControls}
          initial={{ x: 100, y: 100 }}
          style={{ 
            pointerEvents: 'auto', 
            width: 50, 
            height: 50, 
            cursor: isTouring ? 'default' : (isDragging ? 'grabbing' : 'grab'),
            touchAction: 'none'
          }}
        >
          {/* Speech Bubble / Floating Text */}
          <AnimatePresence>
            {(isTouring || heartMessage) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: (() => {
                    const maxWidth = window.innerWidth < 600 ? 160 : 230;
                    const preferredX = window.innerWidth < 600 ? -55 : -90;
                    const absoluteX = megamiPos.x + preferredX;
                    
                    if (absoluteX < 10) return 10 - megamiPos.x;
                    if (absoluteX + maxWidth > window.innerWidth - 10) return window.innerWidth - 10 - maxWidth - megamiPos.x;
                    return preferredX;
                  })(),
                  y: megamiPos.y > window.innerHeight - 220 ? (window.innerWidth < 600 ? -130 : -160) : 60
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ 
                  position: 'absolute', 
                  width: 'max-content',
                  maxWidth: window.innerWidth < 600 ? 160 : 230,
                  zIndex: 10002
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 0.8, sm: 1 },
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.4), // Much more transparent
                    backdropFilter: 'blur(4px)',
                    border: `1px solid ${alpha(getMoodColor(), 0.3)}`,
                    position: 'relative',
                    boxShadow: `0 2px 10px ${alpha(getMoodColor(), 0.1)}`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: (() => {
                        const maxWidth = window.innerWidth < 600 ? 160 : 230;
                        const preferredX = window.innerWidth < 600 ? -55 : -90;
                        const absoluteX = megamiPos.x + preferredX;
                        let finalX = preferredX;
                        
                        if (absoluteX < 10) finalX = 10 - megamiPos.x;
                        else if (absoluteX + maxWidth > window.innerWidth - 10) finalX = window.innerWidth - 10 - maxWidth - megamiPos.x;
                        
                        return 25 - finalX;
                      })(),
                      top: megamiPos.y > window.innerHeight - 220 ? 'auto' : -10,
                      bottom: megamiPos.y > window.innerHeight - 220 ? -10 : 'auto',
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderBottom: megamiPos.y > window.innerHeight - 220 ? 'none' : `10px solid ${alpha(getMoodColor(), 0.3)}`,
                      borderTop: megamiPos.y > window.innerHeight - 220 ? `10px solid ${alpha(getMoodColor(), 0.3)}` : 'none',
                    }
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: isTouring ? 1 : 0, 
                      lineHeight: 1.2, 
                      fontSize: { xs: '0.75rem', sm: '0.8rem' },
                      color: theme.palette.text.primary,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      textAlign: 'center'
                    }}
                  >
                    {isTouring ? TOUR_STEPS[currentStep].message : (isHoldingHeart || heartMessage ? heartMessage : '')}
                  </Typography>
                  {isTouring && (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button 
                        size="small" 
                        variant="contained" 
                        onClick={nextStep} 
                        endIcon={<ChevronRight size={14} />} 
                        sx={{ 
                          py: 0, 
                          px: 2, 
                          fontSize: '0.7rem', 
                          minWidth: 'auto',
                          borderRadius: 2,
                          textTransform: 'none'
                        }}
                      >
                        {currentStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Megami Body */}
          <Box 
            component={motion.div}
            onTap={handleMegamiClick}
            sx={{ cursor: 'pointer', position: 'relative' }}
          >
              <AnimatePresence>
                {(mood === 'happy' || isHoldingHeart || isGivingRose) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{ position: 'absolute', top: -20, right: -20, color: isGivingRose ? roseColor : (mood === 'happy' ? '#FFD700' : heartColor) }}
                  >
                    {isGivingRose ? <Flower2 size={24} /> : (mood === 'happy' ? <Sparkles size={20} /> : <Heart size={20} fill={heartColor} />)}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div 
                animate={bodyControls}
              >
                <Bot 
                  size={40} 
                  color={getMoodColor()} 
                  strokeWidth={2.5}
                />
              </motion.div>
            </Box>
        </motion.div>
      </Box>
    </>
  );
};
