import { planningConstraintsSchema } from '@wanderly/contracts';
import { Link } from 'react-router';
import { buttonVariants } from '../components/ui/button';

const example = planningConstraintsSchema.parse({
  peopleCount: 2,
  budget: 700000,
  currency: 'VND',
  interests: ['cafe', 'photography', 'food'],
});

export function HomePage() {
  const budgetLabel =
    example.budget === null
      ? 'chưa đặt'
      : `${example.budget.toLocaleString('vi-VN')}đ`;

  return (
    <main className="page-shell">
      <p className="eyebrow">Wanderly</p>
      <h1>Biến nhu cầu thành một hành trình có thể thực hiện ngay.</h1>
      <p className="description">
        MVP đang được xây dựng cho Web React và Mobile React Native. Kịch bản
        mẫu có {example.peopleCount} người với ngân sách {budgetLabel}.
      </p>
      <Link className={buttonVariants({ variant: 'outline', size: 'lg' })} to="/explore">
        Khám phá địa điểm
      </Link>
    </main>
  );
}
