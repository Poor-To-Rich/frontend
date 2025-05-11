import TransactionDetailItem from '@/components/detailItem/TransactionDetailItem';
import type { Meta, StoryObj } from '@storybook/react';

function DetailItem() {
  return (
    <div className="">
      <TransactionDetailItem
        id={1}
        color={'#ff55ad'}
        category="식비"
        title={'상하이버거세트'}
        isIteration
        type="EXPENSE"
        cost={45626546888798978}
      />
      <TransactionDetailItem
        id={1}
        color={'#9ADEF1'}
        category="용돈"
        title={'용돈이지롱'}
        type="INCOME"
        cost={12678689}
      />
    </div>
  );
}

const meta = {
  component: DetailItem,
} satisfies Meta<typeof DetailItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
