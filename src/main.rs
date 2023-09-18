use anyhow::Result;
use glob::glob;
use std::path::PathBuf;

fn main() -> Result<()> {
    {
        let values = glob("**/__tests__/**")?;
        dbg!(&values);

        for value in values {
            dbg!(&value);
        }
    }

    {
        let pattern: Vec<PathBuf> = glob("**/__tests__/**")?.filter_map(|p| p.ok()).collect();

        dbg!(&pattern);
    }

    Ok(())
}
