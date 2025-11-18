import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';

const ROWS = 30;
const COLS = 22;

const BACKGROUND_OPTIONS = [
  { name: 'Темный', color: '#1A1F2C' },
  { name: 'Светлый', color: '#F1F0FB' },
  { name: 'Графит', color: '#403E43' },
  { name: 'Синий', color: '#0EA5E9' },
  { name: 'Фиолетовый', color: '#9b87f5' },
];

const TOKEN_COLORS = [
  { name: 'Фиолетовый', color: '#9b87f5' },
  { name: 'Розовый', color: '#D946EF' },
  { name: 'Оранжевый', color: '#F97316' },
  { name: 'Синий', color: '#0EA5E9' },
  { name: 'Зеленый', color: '#10B981' },
  { name: 'Красный', color: '#ea384c' },
  { name: 'Желтый', color: '#FEF7CD' },
];

export default function GameBoard() {
  const [cells, setCells] = useState<Record<string, string>>({});
  const [backgroundColor, setBackgroundColor] = useState('#1A1F2C');
  const [selectedTokenColor, setSelectedTokenColor] = useState('#9b87f5');

  const handleCellClick = (row: number, col: number) => {
    const key = `${row}-${col}`;
    setCells((prev) => {
      const newCells = { ...prev };
      if (newCells[key]) {
        delete newCells[key];
      } else {
        newCells[key] = selectedTokenColor;
      }
      return newCells;
    });
  };

  const clearBoard = () => {
    setCells({});
  };

  const getCellStyle = (row: number, col: number) => {
    const key = `${row}-${col}`;
    return cells[key] ? { backgroundColor: cells[key] } : {};
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center p-4"
      style={{ backgroundColor }}
    >
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" style={{ color: backgroundColor === '#F1F0FB' ? '#1A1F2C' : '#FFFFFF' }}>
            Игровое поле
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="gap-2"
                style={{ 
                  borderColor: backgroundColor === '#F1F0FB' ? '#1A1F2C' : '#FFFFFF',
                  color: backgroundColor === '#F1F0FB' ? '#1A1F2C' : '#FFFFFF',
                  backgroundColor: 'transparent'
                }}
              >
                <Icon name="Settings" size={20} />
                Настройки
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Настройки</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Цвет фона</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {BACKGROUND_OPTIONS.map((option) => (
                      <button
                        key={option.color}
                        onClick={() => setBackgroundColor(option.color)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          backgroundColor === option.color ? 'border-primary ring-2 ring-primary' : 'border-border'
                        }`}
                        style={{ backgroundColor: option.color }}
                      >
                        <span className="text-white font-medium drop-shadow-lg">{option.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Цвет жетона</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {TOKEN_COLORS.map((token) => (
                      <button
                        key={token.color}
                        onClick={() => setSelectedTokenColor(token.color)}
                        className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                          selectedTokenColor === token.color ? 'border-primary ring-2 ring-primary' : 'border-border'
                        }`}
                        style={{ backgroundColor: token.color }}
                      >
                        <span className="text-white font-medium drop-shadow-lg">{token.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={clearBoard} variant="destructive" className="w-full">
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Очистить поле
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div 
          className="inline-block bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-2xl"
          style={{
            border: `2px solid ${backgroundColor === '#F1F0FB' ? 'rgba(26, 31, 44, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
          }}
        >
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
          >
            {Array.from({ length: ROWS }, (_, row) =>
              Array.from({ length: COLS }, (_, col) => (
                <button
                  key={`${row}-${col}`}
                  onClick={() => handleCellClick(row, col)}
                  className="w-6 h-6 border transition-all duration-200 hover:scale-110 rounded-sm"
                  style={{
                    ...getCellStyle(row, col),
                    borderColor: backgroundColor === '#F1F0FB' ? 'rgba(26, 31, 44, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                    backgroundColor: cells[`${row}-${col}`] ? cells[`${row}-${col}`] : 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div 
          className="mt-6 text-center text-sm"
          style={{ color: backgroundColor === '#F1F0FB' ? '#1A1F2C' : 'rgba(255, 255, 255, 0.7)' }}
        >
          Нажмите на клетку, чтобы разместить жетон. Нажмите снова, чтобы убрать.
        </div>
      </div>
    </div>
  );
}
