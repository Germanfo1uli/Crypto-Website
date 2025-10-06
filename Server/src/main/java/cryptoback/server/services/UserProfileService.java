package cryptoback.server.services;

import cryptoback.server.models.user.UserProfile;
import cryptoback.server.repositories.UserProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class UserProfileService {
    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) { this.repository = repository; }

    @Async
    @Transactional
    public CompletableFuture<UserProfile> createUserProfileAsync(UserProfile userProfile)
    {
        return CompletableFuture.completedFuture(repository.save(userProfile));
    }

    @Async
    @Transactional
    public CompletableFuture<UserProfile> getByIdUserProfileAsync(Long id)
    {
        return CompletableFuture.completedFuture(repository.findById(id).orElseThrow(() ->
                new RuntimeException("User Profile not found")));
    }

    @Async
    @Transactional
    public CompletableFuture<UserProfile> updateUserProfileAsync(UserProfile userProfile)
    {
        return CompletableFuture.completedFuture(repository.save(userProfile));
    }

    @Async
    @Transactional
    public CompletableFuture<Void> deleteUserProfileAsync(Long id)
    {
        repository.deleteById(id);
        return CompletableFuture.completedFuture(null);
    }
}
