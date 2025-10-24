import { useGame } from '../hooks/useGame';
import { shopItems } from '../data/shopItems';
import './Shop.css';

export default function Shop() {
  const { gameState, purchaseItem } = useGame();

  const handlePurchase = (itemId: string, cost: number) => {
    const success = purchaseItem(itemId, cost);
    if (success) {
      alert('Purchase successful!');
    } else {
      alert('Not enough currency!');
    }
  };

  return (
    <div className="shop">
      <h2>🏪 Kanji Shop</h2>
      <p className="currency-display">Your Currency: 💰 {gameState.learner.currency}</p>
      
      <div className="shop-sections">
        <div className="shop-section">
          <h3>📜 ZiScrolls</h3>
          <div className="items-grid">
            {shopItems
              .filter(item => item.type === 'scroll')
              .map(item => (
                <div key={item.id} className="shop-item">
                  <h4>{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="price">💰 {item.price}</span>
                    <button
                      className="buy-button"
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={gameState.learner.currency < item.price}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="shop-section">
          <h3>🧪 Potions</h3>
          <div className="items-grid">
            {shopItems
              .filter(item => item.type === 'potion')
              .map(item => (
                <div key={item.id} className="shop-item">
                  <h4>{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-footer">
                    <span className="price">💰 {item.price}</span>
                    <button
                      className="buy-button"
                      onClick={() => handlePurchase(item.id, item.price)}
                      disabled={gameState.learner.currency < item.price}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
