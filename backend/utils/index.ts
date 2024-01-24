/**
 * 해당 파일은 절대 수정하지 말아주세요.
 */
export async function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
