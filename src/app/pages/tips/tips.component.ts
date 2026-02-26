import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Обов'язково для роботи пошуку (ngModel)
import { CommonModule } from '@angular/common';

// Описуємо структуру нашої підказки
interface Tip {
  title: string;
  category: string;
  content: string; // Тут будемо зберігати текст з HTML-тегами
}

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, FormsModule], // Додаємо FormsModule сюди
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.scss'
})
export class TipsComponent {
  // Змінні для стану сторінки
  searchQuery: string = '';
  activeCategory: string = 'Всі';

  // Список всіх категорій для кнопок-чипсів
  categories: string[] = [
    'Всі', 
    '⚡ Базові поняття', 
    '🔋 Батареї, станції та інвертори', 
    '🏠 Побутова техніка', 
    '☀️ Сонячна енергія'
  ];

  // Наша "База знань"
  tips: Tip[] = [
    {
      category: '⚡ Базові поняття',
      title: 'Ват (W) vs Ват-година (Wh)',
      content: '<p><strong>Ват (W)</strong> — це швидкість, з якою прилад "їсть" енергію (як швидкість авто).</p><p><strong>Ват-година (Wh)</strong> — це об\'єм спожитої енергії за певний час (як кількість літрів бензину в баку).</p>'
    },
    {
      category: '⚡ Базові поняття',
      title: 'Закон Ома (простий трикутник)',
      content: '<p>Як знайти потужність: <strong>W = V × A</strong></p><p>Наприклад, потужність роутера "12V 1.5A": 12 × 1.5 = 18 Вт.</p>'
    },
    {
      category: '🔋 Батареї, станції та інвертори',
      title: 'Чому станція віддає не всю ємність?',
      content: '<p>Справа у <strong>ККД інвертора</strong>. На перетворення струму з батареї у розетку 220V витрачається 10-15% енергії.</p>'
    },
    {
      category: '🔋 Батареї, станції та інвертори',
      title: 'AC vs DC: що вигідніше?',
      content: '<p>Заряджати телефон через USB (DC) від станції вигідніше, оскільки ви уникаєте зайвих втрат на подвійне перетворення струму.</p>'
    },
    {
      category: '🏠 Побутова техніка',
      title: 'Приховані "пожирачі" енергії',
      content: '<p>Найбільше навантаження дають прилади з нагрівальними елементами. Наприклад, нагрів води і сушка у пральній машині створюють пікове навантаження понад 2000 Вт.</p>'
    },
    {
      category: '☀️ Сонячна енергія',
      title: 'Що таке інсоляція?',
      content: '<p>Це кількість сонячних променів, які досягають поверхні. Тому панель на 100 Вт не видає 100 Вт у похмуру погоду.</p>'
    }
  ];

  // Ця функція (геттер) автоматично фільтрує і групує масив при будь-якій зміні пошуку або категорії
  get groupedFilteredTips() {
    // 1. Фільтруємо за категорією та текстом пошуку
    const filtered = this.tips.filter(tip => {
      const matchesCategory = this.activeCategory === 'Всі' || tip.category === this.activeCategory;
      const matchesSearch = tip.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            tip.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 2. Групуємо відфільтровані результати назад по категоріях для красивого виводу
    const groups: { [key: string]: Tip[] } = {};
    filtered.forEach(tip => {
      if (!groups[tip.category]) groups[tip.category] = [];
      groups[tip.category].push(tip);
    });

    return Object.keys(groups).map(key => ({ category: key, items: groups[key] }));
  }

  // Функція для зміни активної категорії
  setCategory(category: string) {
    this.activeCategory = category;
  }
}