/**
 * 创建管理员账号的 seed 脚本
 * 用法: cd src && bun run scripts/seed-admin.ts
 */
import { auth } from "@/lib/auth";

const ADMIN_EMAIL = "admin@devforge.com";
const ADMIN_PASSWORD = "admin123";
const ADMIN_NAME = "Admin";

async function seedAdmin() {
  console.log(`正在创建管理员账号: ${ADMIN_EMAIL}`);

  try {
    const res = await auth.api.signUpEmail({
      body: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: ADMIN_NAME,
      },
    });

    if (!res) {
      console.error("创建失败：未知错误");
      process.exit(1);
    }

    console.log("管理员账号创建成功！");
    console.log(`  邮箱: ${ADMIN_EMAIL}`);
    console.log(`  密码: ${ADMIN_PASSWORD}`);
    console.log("\n请登录后立即修改密码。");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes("already") || message.includes("exist")) {
      console.log("管理员账号已存在，跳过创建。");
    } else {
      console.error("创建失败:", message);
      process.exit(1);
    }
  }
}

seedAdmin();
