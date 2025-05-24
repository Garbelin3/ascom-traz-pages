
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { createTestUsers } from '@/utils/createTestUsers';

const CreateTestUsersButton = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateTestUsers = async () => {
    try {
      setIsCreating(true);
      await createTestUsers();
      toast({
        title: 'Usuários de teste criados!',
        description: 'Os usuários de teste foram criados com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar usuários',
        description: 'Houve um erro ao criar os usuários de teste.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Button
      onClick={handleCreateTestUsers}
      disabled={isCreating}
      variant="outline"
      className="mb-4"
    >
      {isCreating ? 'Criando...' : 'Criar Usuários de Teste'}
    </Button>
  );
};

export default CreateTestUsersButton;
