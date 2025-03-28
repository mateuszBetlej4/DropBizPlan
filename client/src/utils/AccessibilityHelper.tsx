import React, { useEffect } from 'react';

/**
 * Komponent pomocniczy rozwiązujący problemy z dostępnością w aplikacji
 * Usuwa atrybuty aria-hidden z elementów gdy zawierają elementy z fokusem
 */
export const AccessibilityFixer: React.FC = () => {
  useEffect(() => {
    // Funkcja do naprawiania atrybutów aria-hidden
    const fixAriaHidden = () => {
      // Znajdź element root
      const rootEl = document.getElementById('root');
      if (rootEl && rootEl.getAttribute('aria-hidden') === 'true') {
        rootEl.removeAttribute('aria-hidden');
      }
      
      // Znajdź header/AppBar i upewnij się, że nie ma aria-hidden
      const headerElements = document.querySelectorAll('header');
      headerElements.forEach(header => {
        if (header.getAttribute('aria-hidden') === 'true') {
          header.removeAttribute('aria-hidden');
        }
      });
      
      // Znajdź wszystkie elementy z aria-hidden="true"
      const elementsWithAriaHidden = document.querySelectorAll('[aria-hidden="true"]');
      elementsWithAriaHidden.forEach(el => {
        // Sprawdź czy element zawiera aktywny element lub elementy z tabindex
        if (el.contains(document.activeElement) || el.querySelectorAll('[tabindex]').length > 0) {
          el.removeAttribute('aria-hidden');
        }
        
        // Sprawdź czy element zawiera linki <a> lub przyciski
        if (el.querySelectorAll('a, button').length > 0) {
          el.removeAttribute('aria-hidden');
        }
      });
    };

    // Uruchom naprawę teraz i dodaj obserwatory
    fixAriaHidden();
    
    // Ustaw obserwator mutacji, aby śledzić zmiany w DOM
    const observer = new MutationObserver((mutations) => {
      // Sprawdź, czy którakolwiek z mutacji dotyczy atrybutu aria-hidden
      const needsFix = mutations.some(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'aria-hidden'
      );
      
      if (needsFix) {
        fixAriaHidden();
      }
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true,
      attributeFilter: ['aria-hidden'] 
    });
    
    // Dodaj listenery zdarzeń
    document.addEventListener('focusin', fixAriaHidden);
    document.addEventListener('keydown', fixAriaHidden);
    
    // Ustaw interwał sprawdzający regularnie
    const interval = setInterval(fixAriaHidden, 1000);
    
    // Czyszczenie przy odmontowaniu
    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', fixAriaHidden);
      document.removeEventListener('keydown', fixAriaHidden);
      clearInterval(interval);
    };
  }, []);

  return null; // Komponent nie renderuje nic
};

export default AccessibilityFixer; 