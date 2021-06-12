import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 30 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP()", onUpdate: "CURRENT_TIMESTAMP()" })
  updatedAt: Date;

  private tempPassword: string;

  @AfterLoad()
  loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      if (this.tempPassword !== this.password) {
        try {
          this.password = await bcrypt.hash(this.password, 10);
        } catch (e) {
          throw new Error(`There was an error with hashing!`);
        }
      }
    }
  }

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
