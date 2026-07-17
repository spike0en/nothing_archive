import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './HeroGlyphLogo.module.css';


type Mode = 'LOGO' | 'PLAY';
type GameMode = 'SNAKE' | 'PONG';
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Point {
  r: number;
  c: number;
}

export default function HeroGlyphLogo(): React.JSX.Element {
  const logoDark256Url = useBaseUrl('/img/brand/logo-dark-hero-256.webp');
  const logoDark384Url = useBaseUrl('/img/brand/logo-dark-hero-384.webp');
  const logoDarkUrl = useBaseUrl('/img/brand/logo-dark-hero.webp');

  const [mode, setMode] = useState<Mode>('LOGO');
  const [activeGame, setActiveGame] = useState<GameMode>('SNAKE');

  const [clickCount, setClickCount] = useState<number>(0);
  const lastClickTimeRef = useRef<number>(0);

  const [snake, setSnakeState] = useState<Point[]>([
    { r: 7, c: 4 },
    { r: 7, c: 3 }
  ]);
  const snakeRef = useRef<Point[]>([
    { r: 7, c: 4 },
    { r: 7, c: 3 }
  ]);
  const setSnake = (val: Point[] | ((prev: Point[]) => Point[])) => {
    setSnakeState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      snakeRef.current = newVal;
      return newVal;
    });
  };

  const [food, setFoodState] = useState<Point>({ r: 5, c: 10 });
  const foodRef = useRef<Point>({ r: 5, c: 10 });
  const setFood = (val: Point) => {
    setFoodState(val);
    foodRef.current = val;
  };

  const [score, setScoreState] = useState<number>(0);
  const scoreRef = useRef<number>(0);
  const setScore = (val: number | ((prev: number) => number)) => {
    setScoreState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      scoreRef.current = newVal;
      return newVal;
    });
  };

  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const directionRef = useRef<Direction>('RIGHT');

  const [paddleCol, setPaddleColState] = useState<number>(7);
  const paddleColRef = useRef<number>(7);
  const setPaddleCol = (val: number | ((prev: number) => number)) => {
    setPaddleColState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      paddleColRef.current = newVal;
      return newVal;
    });
  };

  const [ball, setBallState] = useState<Point>({ r: 4, c: 7 });
  const ballRef = useRef<Point>({ r: 4, c: 7 });
  const setBall = (val: Point | ((prev: Point) => Point)) => {
    setBallState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      ballRef.current = newVal;
      return newVal;
    });
  };

  const [ballVel, setBallVelState] = useState<Point>({ r: 1, c: 1 });
  const ballVelRef = useRef<Point>({ r: 1, c: 1 });
  const setBallVel = (val: Point | ((prev: Point) => Point)) => {
    setBallVelState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      ballVelRef.current = newVal;
      return newVal;
    });
  };

  const [pongScore, setPongScoreState] = useState<number>(0);
  const pongScoreRef = useRef<number>(0);
  const setPongScore = (val: number | ((prev: number) => number)) => {
    setPongScoreState(prev => {
      const newVal = typeof val === 'function' ? val(prev) : val;
      pongScoreRef.current = newVal;
      return newVal;
    });
  };

  const lastPaddleMoveTimeRef = useRef<number>(0);
  const paddleMoveDirRef = useRef<number | null>(null);

  const dpadTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'PLAY' || isGameOver) return;

      const isMoveKey = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'
      ].includes(e.key);

      if (isMoveKey && !gameStarted) {
        setGameStarted(true);
      }

      if (activeGame === 'SNAKE') {
        let newDir: Direction | null = null;
        switch (e.key) {
          case 'ArrowUp':
          case 'w':
          case 'W':
            if (directionRef.current !== 'DOWN') newDir = 'UP';
            break;
          case 'ArrowDown':
          case 's':
          case 'S':
            if (directionRef.current !== 'UP') newDir = 'DOWN';
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            if (directionRef.current !== 'RIGHT') newDir = 'LEFT';
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            if (directionRef.current !== 'LEFT') newDir = 'RIGHT';
            break;
          default:
            return;
        }

        if (newDir) {
          e.preventDefault();
          directionRef.current = newDir;
        }
      } else if (activeGame === 'PONG') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          setPaddleCol(col => {
            const nextCol = Math.max(3, col - 1);
            if (nextCol !== col) {
              lastPaddleMoveTimeRef.current = Date.now();
              paddleMoveDirRef.current = -1;
            }
            return nextCol;
          });
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          setPaddleCol(col => {
            const nextCol = Math.min(11, col + 1);
            if (nextCol !== col) {
              lastPaddleMoveTimeRef.current = Date.now();
              paddleMoveDirRef.current = 1;
            }
            return nextCol;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, activeGame, isGameOver, gameStarted]);

  useEffect(() => {
    if (mode !== 'PLAY' || activeGame !== 'SNAKE' || isGameOver || !gameStarted) return;

    const currentSpeed = Math.max(100, 320 - scoreRef.current * 15);

    const gameTick = () => {
      const head = snakeRef.current[0];
      let newHead: Point = { ...head };

      switch (directionRef.current) {
        case 'UP': newHead.r = head.r - 1; break;
        case 'DOWN': newHead.r = head.r + 1; break;
        case 'LEFT': newHead.c = head.c - 1; break;
        case 'RIGHT': newHead.c = head.c + 1; break;
      }

      if (newHead.r < 2) newHead.r = 12;
      if (newHead.r > 12) newHead.r = 2;
      if (newHead.c < 2) newHead.c = 12;
      if (newHead.c > 12) newHead.c = 2;

      const selfHit = snakeRef.current.some(seg => seg.r === newHead.r && seg.c === newHead.c);
      if (selfHit) {
        setIsGameOver(true);
        return;
      }

      const nextSnake = [newHead, ...snakeRef.current];

      if (newHead.r === foodRef.current.r && newHead.c === foodRef.current.c) {
        setScore(s => s + 1);
        let newFood: Point;
        let attempts = 0;
        do {
          newFood = {
            r: Math.floor(Math.random() * 11) + 2,
            c: Math.floor(Math.random() * 11) + 2
          };
          const onSnake = nextSnake.some(seg => seg.r === newFood.r && seg.c === newFood.c);
          if (!onSnake) break;
          attempts++;
        } while (attempts < 100);

        setFood(newFood);
      } else {
        nextSnake.pop();
      }

      setSnake(nextSnake);
    };

    const interval = setInterval(gameTick, currentSpeed);
    return () => clearInterval(interval);
  }, [mode, activeGame, isGameOver, score, gameStarted]);

  useEffect(() => {
    if (mode !== 'PLAY' || activeGame !== 'PONG' || isGameOver || !gameStarted) return;

    const currentSpeed = Math.max(80, 220 - pongScoreRef.current * 10);

    const gameTick = () => {
      let nextR = ballRef.current.r + ballVelRef.current.r;
      let nextC = ballRef.current.c + ballVelRef.current.c;
      let velR = ballVelRef.current.r;
      let velC = ballVelRef.current.c;

      if (nextC < 2) {
        nextC = 3;
        velC = 1;
      } else if (nextC > 12) {
        nextC = 11;
        velC = -1;
      }

      if (nextR < 2) {
        nextR = 3;
        velR = 1;
      }

      if (nextR === 12) {
        const onPaddle = nextC >= paddleColRef.current - 1 && nextC <= paddleColRef.current + 1;
        if (onPaddle) {
          nextR = 11;
          velR = -1;
          setPongScore(s => s + 1);
          
          // Apply active steering if the paddle was moved recently
          const now = Date.now();
          if (now - lastPaddleMoveTimeRef.current < 350 && paddleMoveDirRef.current !== null) {
            velC = paddleMoveDirRef.current;
          }
          // Specular reflection by default (velC remains unchanged), breaking infinite stationary loops
        }
      }

      if (nextR > 12) {
        setIsGameOver(true);
        return;
      }

      setBallVel({ r: velR, c: velC });
      setBall({ r: nextR, c: nextC });
    };

    const interval = setInterval(gameTick, currentSpeed);
    return () => clearInterval(interval);
  }, [mode, activeGame, isGameOver, pongScore, gameStarted]);

  const resetGame = () => {
    setIsGameOver(false);
    setGameStarted(false);
    if (activeGame === 'SNAKE') {
      const initSnake = [
        { r: 7, c: 4 },
        { r: 7, c: 3 }
      ];
      setSnake(initSnake);
      directionRef.current = 'RIGHT';
      setScore(0);
      setFood({ r: 5, c: 10 });
    } else {
      setPaddleCol(7);
      // Randomize starting column between 4 and 10 to add variation and prevent static loops
      const startC = Math.floor(Math.random() * 7) + 4;
      setBall({ r: 3, c: startC });
      setBallVel({ r: 1, c: Math.random() > 0.5 ? 1 : -1 });
      setPongScore(0);
      lastPaddleMoveTimeRef.current = 0;
      paddleMoveDirRef.current = null;
    }
  };

  const togglePlayMode = () => {
    setIsGameOver(false);
    setGameStarted(false);
    if (mode === 'PLAY') {
      setMode('LOGO');
    } else {
      setMode('PLAY');
      resetGame();
    }
  };

  const handleBezelClick = (e: React.MouseEvent) => {
    togglePlayMode();
  };

  const handleDpadPress = (dir: Direction) => {
    if (mode !== 'PLAY' || isGameOver) return;

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (activeGame === 'SNAKE') {
      let isValid = false;
      if (dir === 'UP' && directionRef.current !== 'DOWN') isValid = true;
      if (dir === 'DOWN' && directionRef.current !== 'UP') isValid = true;
      if (dir === 'LEFT' && directionRef.current !== 'RIGHT') isValid = true;
      if (dir === 'RIGHT' && directionRef.current !== 'LEFT') isValid = true;

      if (isValid) {
        directionRef.current = dir;
      }
    } else if (activeGame === 'PONG') {
      if (dir === 'LEFT') {
        setPaddleCol(col => {
          const nextCol = Math.max(3, col - 1);
          if (nextCol !== col) {
            lastPaddleMoveTimeRef.current = Date.now();
            paddleMoveDirRef.current = -1;
          }
          return nextCol;
        });
      } else if (dir === 'RIGHT') {
        setPaddleCol(col => {
          const nextCol = Math.min(11, col + 1);
          if (nextCol !== col) {
            lastPaddleMoveTimeRef.current = Date.now();
            paddleMoveDirRef.current = 1;
          }
          return nextCol;
        });
      }
    }
  };

  const startDpadHold = (dir: Direction, e?: React.MouseEvent | React.TouchEvent) => {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    if (mode !== 'PLAY' || isGameOver) return;

    if (dpadTimerRef.current) clearInterval(dpadTimerRef.current);

    handleDpadPress(dir);

    dpadTimerRef.current = setInterval(() => {
      handleDpadPress(dir);
    }, 75);
  };

  const stopDpadHold = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e && e.cancelable) {
      e.preventDefault();
    }
    if (dpadTimerRef.current) {
      clearInterval(dpadTimerRef.current);
      dpadTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (dpadTimerRef.current) clearInterval(dpadTimerRef.current);
    };
  }, []);

  const getLedState = (r: number, c: number): { on: boolean; type: number } => {
    if (mode === 'PLAY') {
      if (activeGame === 'SNAKE') {
        if (snake[0].r === r && snake[0].c === c) {
          return { on: true, type: isGameOver ? 3 : 1 };
        }
        const bodyPart = snake.slice(1).some(seg => seg.r === r && seg.c === c);
        if (bodyPart) return { on: true, type: 1 };
        if (food.r === r && food.c === c) return { on: true, type: 3 };
      } else if (activeGame === 'PONG') {
        if (r === 12 && c >= paddleCol - 1 && c <= paddleCol + 1) {
          return { on: true, type: 1 };
        }
        if (ball.r === r && ball.c === c) {
          return { on: true, type: 3 };
        }
      }
    }

    return { on: false, type: 0 };
  };

  return (
    <div className={clsx(
      styles.logoChassis,
      mode === 'LOGO' && styles.logoChassisLogo,
      mode === 'PLAY' && styles.logoChassisPlay
    )}>
      <div className={styles.gridOverlay} />

      {mode === 'LOGO' && (
        <>
          <div className={styles.ring1} />
          <div className={styles.ring2} />
          <div className={styles.ring3} />
        </>
      )}

      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.stopPropagation();
          togglePlayMode();
        }}
        aria-label="Close game console"
      >
        ✕
      </button>

      <div className={styles.bezelRing} onClick={handleBezelClick}>
        <div className={styles.circleDisplay}>
          {mode === 'LOGO' ? (
            <img 
              src={logoDarkUrl} 
              srcSet={`${logoDark256Url} 256w, ${logoDark384Url} 384w, ${logoDarkUrl} 512w`}
              sizes="(max-width: 576px) 146px, (max-width: 996px) 164px, 184px"
              className={styles.gifLogo}
              alt="Nothing Archive Logo"
              width={184}
              height={184}
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <div className={styles.matrixGrid}>
              {Array(225).fill(null).map((_, index) => {
                const r = Math.floor(index / 15);
                const c = index % 15;
                const led = getLedState(r, c);
                let dotClass = styles.dotOff;
                let inlineStyle: React.CSSProperties = {};

                const isBoundary = (mode === 'PLAY') && (
                  ((r === 1 || r === 13) && c >= 1 && c <= 13) ||
                  ((c === 1 || c === 13) && r >= 1 && r <= 13)
                );

                if (led.on) {
                  if (led.type === 1) {
                    dotClass = styles.dotWhite;
                    inlineStyle = { transform: 'scale(0.95)' };
                  } else if (led.type === 2) {
                    dotClass = styles.dotGrey;
                    inlineStyle = { transform: 'scale(0.9)' };
                  } else if (led.type === 3) {
                    dotClass = styles.dotRed;
                    inlineStyle = {
                      transform: 'scale(1.0)',
                      animation: isGameOver ? 'blink 0.5s infinite steps(1)' : 'none'
                    };
                  }
                } else if (isBoundary) {
                  dotClass = styles.dotBoundary;
                }

                return (
                  <div
                    key={index}
                    className={`${styles.matrixDot} ${dotClass}`}
                    style={inlineStyle}
                  />
                );
              })}
            </div>
          )}

          {mode === 'PLAY' && !gameStarted && !isGameOver && (
            <div 
              className={styles.startOverlay} 
              onClick={(e) => {
                e.stopPropagation();
                setGameStarted(true);
              }}
            >
              <div className={styles.startText}>{activeGame === 'SNAKE' ? 'SNAKE' : 'PONG'}</div>
              <div className={styles.playPrompt}>TAP TO START</div>
            </div>
          )}

          {mode === 'PLAY' && isGameOver && (
            <div 
              className={styles.gameOverOverlay} 
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
            >
              <div className={styles.gameOverText}>GAME OVER</div>
              <div className={styles.scoreText}>SCORE: {activeGame === 'SNAKE' ? score : pongScore}</div>
              <div className={styles.retryPrompt}>TAP TO RETRY</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.bottomArea}>
        
        {mode === 'PLAY' && (
          <div className={styles.playConsole}>
            <div className={styles.playControlsRow}>
              <div className={styles.dpadContainer}>
                <button 
                  className={clsx(styles.dpadBtn, styles.dpadUp)} 
                  onMouseDown={(e) => startDpadHold('UP', e)}
                  onTouchStart={(e) => startDpadHold('UP', e)}
                  onMouseUp={(e) => stopDpadHold(e)}
                  onMouseLeave={(e) => stopDpadHold(e)}
                  onTouchEnd={(e) => stopDpadHold(e)}
                  aria-label="Up"
                  disabled={activeGame === 'PONG'}
                >▲</button>
                <div className={styles.dpadMiddleRow}>
                  <button 
                    className={clsx(styles.dpadBtn, styles.dpadLeft)} 
                    onMouseDown={(e) => startDpadHold('LEFT', e)}
                    onTouchStart={(e) => startDpadHold('LEFT', e)}
                    onMouseUp={(e) => stopDpadHold(e)}
                    onMouseLeave={(e) => stopDpadHold(e)}
                    onTouchEnd={(e) => stopDpadHold(e)}
                    aria-label="Left"
                  >◀</button>
                  <div className={styles.dpadCenter} />
                  <button 
                    className={clsx(styles.dpadBtn, styles.dpadRight)} 
                    onMouseDown={(e) => startDpadHold('RIGHT', e)}
                    onTouchStart={(e) => startDpadHold('RIGHT', e)}
                    onMouseUp={(e) => stopDpadHold(e)}
                    onMouseLeave={(e) => stopDpadHold(e)}
                    onTouchEnd={(e) => stopDpadHold(e)}
                    aria-label="Right"
                  >▶</button>
                </div>
                <button 
                  className={clsx(styles.dpadBtn, styles.dpadDown)} 
                  onMouseDown={(e) => startDpadHold('DOWN', e)}
                  onTouchStart={(e) => startDpadHold('DOWN', e)}
                  onMouseUp={(e) => stopDpadHold(e)}
                  onMouseLeave={(e) => stopDpadHold(e)}
                  onTouchEnd={(e) => stopDpadHold(e)}
                  aria-label="Down"
                  disabled={activeGame === 'PONG'}
                >▼</button>
              </div>

              <div className={styles.gameSelectors}>
                <div className={styles.gameToggleGroup}>
                  <button
                    className={clsx(styles.gameBtn, activeGame === 'SNAKE' && styles.gameBtnActive)}
                    onClick={() => { setActiveGame('SNAKE'); resetGame(); }}
                  >
                    SNAKE
                  </button>
                  <button
                    className={clsx(styles.gameBtn, activeGame === 'PONG' && styles.gameBtnActive)}
                    onClick={() => { setActiveGame('PONG'); resetGame(); }}
                  >
                    PONG
                  </button>
                </div>
                <div className={styles.scoreRow}>
                  SCORE: {activeGame === 'SNAKE' ? score : pongScore}
                </div>
              </div>
            </div>

            <div className={styles.playHint}>
              USE WASD, ARROWS, OR ON-SCREEN <span className={styles.noWrap}>D-PAD</span> TO PLAY
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
