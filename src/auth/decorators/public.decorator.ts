import { SetMetadata } from '@nestjs/common';

const IS_PUBLIC = 'IS_PUBLIC';

export const Public = () => SetMetadata(IS_PUBLIC, true);
